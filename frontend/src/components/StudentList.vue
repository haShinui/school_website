<!-- frontend/src/components/StudentList.vue -->
<template>
    <div>
      <h1>Student List</h1>
      <ul>
        <li v-for="student in students" :key="student.id">
          {{ student.first_name }} {{ student.last_name }} - Enrolled on: {{ student.enrollment_date }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'StudentList',
    data() {
      return {
        students: []
      };
    },
    created() {
      axios.get('http://localhost:8000/api/students/')
        .then(response => {
          this.students = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the students:", error);
          this.students = []; // Ensure students array is empty on error
        });
    }
  };
  </script>
  
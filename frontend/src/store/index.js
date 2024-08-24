// frontend/src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      students: []
    };
  },
  mutations: {
    setStudents(state, students) {
      state.students = students;
    }
  },
  actions: {
    fetchStudents({ commit }) {
      // Fetch students from the API and commit to the state
    }
  },
  getters: {
    students: state => state.students,
  }
});

export default store;

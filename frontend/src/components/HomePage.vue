<template>
   <div :class="{'dark': isDarkMode}" class="min-h-screen transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-900">
    <!-- FabLab Section with Background Image -->
    <div class="relative flex flex-col items-center justify-center h-screen">
      <img
        src="https://via.placeholder.com/1920x1080" 
        alt="FabLab Background"
        class="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-30"
      />
      <h1 class="relative z-10 text-7xl font-bold text-indigo-600 dark:text-indigo-400 font-extrabold mb-4 animate-bounce tracking-wide"
        style="font-family: 'Raleway', sans-serif;">FabLab</h1>

      <p class="relative z-10 text-3xl text-gray-800 dark:text-gray-200 italic mb-6">{{ $t('slogan') }}</p>
    </div>

    <!-- About Section -->
    <section class="container mx-auto px-6 py-16 text-center">
      <h2 class="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{{ $t('makerspace_title') }}</h2>
      <p class="text-lg mb-6 text-gray-700 dark:text-gray-300">
        {{ $t('makerspace_desc') }}
      </p>
      <button class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-500">
        {{ $t('learn_more') }}
      </button>
    </section>

    <!-- Featured Projects Section -->
    <section class="bg-gray-100 dark:bg-gray-800 py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{{ $t('projects_title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Project Cards -->
          <div v-for="project in projects" :key="project.id" class="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
            <img :src="project.image" alt="Project Image" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{{ project.title }}</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-4">{{ project.description }}</p>
              <button class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-500">
                {{ $t('learn_more') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Us Section -->
    <section class="bg-indigo-600 dark:bg-indigo-700 text-white py-16 text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-4">{{ $t('join_us_title') }}</h2>
        <p class="text-lg mb-6">
          {{ $t('join_us_desc') }}
        </p>
        <button class="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-400">
          {{ $t('join_now') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
const projects = [
  { id: 1, title: '3D Printed Rocket', description: 'A 3D printed rocket designed and launched by our students.', image: 'https://via.placeholder.com/400x300' },
  { id: 2, title: 'Arduino Weather Station', description: 'A weather station built using Arduino sensors to track temperature, humidity, and more.', image: 'https://via.placeholder.com/400x300' },
  { id: 3, title: 'Robotics Arm', description: 'A functional robotics arm created to automate tasks using coding and mechanics.', image: 'https://via.placeholder.com/400x300' }
]
const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@800&family=Poppins:wght@400;600;700&display=swap');

/* Custom font for FabLab */
h1 {
  font-family: 'Raleway', sans-serif;
}

/* Ensure smooth background transitions between light and dark mode */
body {
  font-family: 'Poppins', sans-serif;
}
</style>

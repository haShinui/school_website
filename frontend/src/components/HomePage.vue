<template>
  <div class="home-page bg-white p-8 rounded-md shadow-lg max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold mb-4 text-gray-800">Welcome to the School Website</h1>

    <!-- Primary Button -->
    <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200 mr-4 mb-4">
      Primary Button
    </button>

    <!-- Secondary Button -->
    <button class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-all duration-200 mb-4">
      Secondary Button
    </button>

    <!-- Card -->
    <div class="border border-gray-300 p-6 mt-6 rounded-lg shadow">
      <!-- Card Header -->
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-gray-700">Home Page</h2>
        <p class="text-gray-500">Main Information</p>
      </div>

      <!-- Card Body -->
      <div>
        <p class="text-gray-600 mb-4">
          You are not logged in. Use the buttons above to navigate through the website or log in to access more features.
        </p>
      </div>

      <!-- Card Footer -->
      <div class="mt-4">
        <button class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-all duration-200">
          Learn More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-page {
  text-align: center;
}
</style>

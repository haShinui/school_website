<template>
  <div
    id="app"
    :class="{'dark': isDarkMode}"
    class="min-h-screen transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-900"
  >
    <!-- Full-width Navigation Bar -->
    <nav class="bg-blue-600 dark:bg-gray-900 w-full shadow-lg z-10 relative">
      <div class="flex justify-between items-center w-full px-6 h-16 relative">
        <!-- Left Section (Logo/Title) -->
        <div class="flex items-center space-x-4">
          <img src="https://via.placeholder.com/40" alt="Logo" class="w-10 h-10 rounded-full shadow-md" />
          <h1 class="text-lg font-bold text-white tracking-wider">School Website</h1>
        </div>

        <!-- Middle Section (Centered Navigation Links with Icons) -->
        <div class="absolute inset-x-0 flex justify-center items-center">
          <div class="flex items-center  justify-center  ">
            <router-link
              to="/"
              class="text-white hover:text-gray-200 inline-flex items-center text-sm font-medium transition-transform transform hover:scale-105"
              active-class="text-white"
            >
              <i class="pi pi-home mr-2"></i>
              <span v-if="currentLocale === 'en'">Home</span>
              <span v-if="currentLocale === 'de'">Startseite</span>
            </router-link>
            
            <router-link
              to="/about"
              class="text-white hover:text-gray-200 inline-flex items-center text-sm font-medium transition-transform transform hover:scale-105"
              active-class="text-white"
            >
              <i class="pi pi-info-circle mr-2"></i>
              <span v-if="currentLocale === 'en'">About</span>
              <span v-if="currentLocale === 'de'">Über uns</span>
            </router-link>
          </div>
        </div>

        <!-- Right Section (Language & Dark Mode Switchers, Login/Profile Dropdown) -->
        <div class="flex items-center space-x-4">
          <!-- Language Switcher -->
          <button @click="switchLanguage" class="flex items-center focus:outline-none">
            <span
              v-if="currentLocale === 'en'"
              key="en-flag"
              class="fi fi-gb w-8 h-6"
              title="Switch to German"
            ></span>
            <span
              v-if="currentLocale === 'de'"
              key="de-flag"
              class="fi fi-de w-8 h-6"
              title="Switch to English"
            ></span>
          </button>

          <!-- Dark/Light Mode Switcher with Ring -->
          <div
            @click="toggleDarkMode"
            class="relative w-12 h-6 bg-gray-300 dark:bg-slate-800 rounded-full flex items-center cursor-pointer ring-1 dark:ring-1 dark:ring-slate-600 ring-slate-500 dark:hover:ring-2 hover:ring-2 dark:hover:ring-green-500 hover:ring-green-500 transition-all p-0.5"
          >
            <!-- Toggle Knob -->
            <div
              :class="{
                'translate-x-[24.5px] bg-black': isDarkMode,
                'translate-x-[-0.5px] bg-white': !isDarkMode
              }"
              class="w-5 h-5 rounded-full transform transition-transform duration-300 flex items-center justify-center"
            >
              <i
                :class="isDarkMode ? 'pi pi-moon text-white' : 'pi pi-sun text-slate-400'"
                class="text-sm"
              ></i>
            </div>
          </div>

          <!-- Profile/Login Dropdown -->
          <div class="relative">
            <!-- Show Login link if not authenticated -->
            <router-link
              v-if="!isAuthenticated"
              to="/login"
              class="text-white hover:text-gray-200 inline-flex items-center text-sm font-medium transition-transform transform hover:scale-105"
              active-class="text-white"
            >
              <i class="pi pi-sign-in mr-2"></i>
              Login
            </router-link>

            <!-- Show Profile dropdown if authenticated -->
            <div
              v-else
              @click="toggleDropdown"
              class="cursor-pointer flex items-center space-x-2"
            >
              <img src="https://via.placeholder.com/30" alt="Profile Image" class="w-8 h-8 rounded-full" />
              <span class="text-white text-sm font-medium">{{ username }}</span>
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
            >
              <router-link
                to="/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </router-link>
              <router-link
                to="/"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="logout"
              >
                Sign Out
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Router View -->
      <router-view></router-view>

  </div>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

// Access Vuex store and router
const store = useStore();
const router = useRouter();

// Profile dropdown state
const isDropdownOpen = ref(false);

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Check if the user is authenticated using Vuex getter
const isAuthenticated = computed(() => store.getters.isAuthenticated);

// Get the username from Vuex store
const username = computed(() => store.getters.username);

// Logout function that triggers Vuex action and redirects to login page
const logout = () => {
  store
    .dispatch('logoutUser') // Call Vuex action to log out
    .then(() => {
      router.push('/login'); // Redirect to login page after logout
    })
    .catch((error) => {
      console.error('Error during logout:', error);
    });
};

// Language Switching using Vue I18n
const { locale } = useI18n();
const currentLocale = ref(locale.value); // Use a reactive ref for currentLocale

// Watch the locale changes to update the flag and locale
watch(locale, (newLocale) => {
  currentLocale.value = newLocale;
});

// Switch between English and German
const switchLanguage = () => {
  locale.value = currentLocale.value === 'en' ? 'de' : 'en';
};

// Dark mode handling
const isDarkMode = ref(false);

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};
</script>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  background-color: #f3f4f6; /* Light mode background */
}

.dark body {
  background-color: #1f2937; /* Dark mode background */
}
</style>

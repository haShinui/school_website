<template>
  <div id="app">
    <!-- Menubar with logo and navigation items -->
    <Menubar :model="menuItems">
      <!-- Logo on the left side -->
      <template #start>
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
          <path
            d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
            fill="var(--p-primary-color)"
          />
          <path
            d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
            fill="var(--p-text-color)"
          />
        </svg>
      </template>

      <!-- Navigation Links -->
      <template #item="{ item, props, hasSubmenu, root }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate" class="flex items-center">
            <span :class="item.icon"></span>
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action" class="flex items-center">
          <span :class="item.icon"></span>
          <span class="ml-2">{{ item.label }}</span>
          <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
        </a>
      </template>

      <!-- Profile icon on the right side with Popover menu -->
      <template #end>
        <div class="flex items-center gap-2">
          <Button type="button" icon="pi pi-share-alt" label="Share" @click="toggle" />
          <Popover ref="op">
            <div class="flex flex-col gap-4 w-[25rem]">
              <ul class="profile-menu">
                <li @click="navigateTo('/profile')">
                  <i class="pi pi-user mr-2"></i> Profile
                </li>
                <li @click="navigateTo('/settings')">
                  <i class="pi pi-cog mr-2"></i> Settings
                </li>
                <li class="separator"></li>
                <li @click="handleLogout">
                  <i class="pi pi-sign-out mr-2"></i> Sign Out
                </li>
              </ul>
            </div>
          </Popover>
        </div>
      </template>
    </Menubar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Popover from 'primevue/popover';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const userRole = computed(() => store.state.userRole);

const fetchAuthUser = () => store.dispatch('fetchAuthUser');
const logoutUser = () => store.dispatch('logoutUser');

const handleLogout = () => {
  logoutUser()
    .then(() => {
      router.push('/login');
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
};

const popoverVisible = ref(false);
const profileButton = ref(null);

const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

const navigateTo = (path) => {
  router.push(path);
  popoverVisible.value = false;
};

onMounted(() => {
  fetchAuthUser();
});

const menuItems = computed(() => {
  let items = [
    { label: 'Home', icon: 'pi pi-fw pi-home', route: '/' },
    { label: 'About', icon: 'pi pi-fw pi-info', route: '/about' },
  ];

  if (isAuthenticated.value) {
    if (userRole.value === 'normal') {
      items.push({ label: 'Sign Up for Course', icon: 'pi pi-fw pi-user-plus', route: '/signup' });
    }
    if (userRole.value === 'manager') {
      items.push({ label: 'Manager Dashboard', icon: 'pi pi-fw pi-cog', route: '/manager-dashboard' });
    }
  } else {
    items.push({ label: 'Login', icon: 'pi pi-fw pi-sign-in', route: '/login' });
  }

  return items;
});
</script>

<style scoped>
.profile-menu {
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  background: var(--surface-ground);
  border-radius: 0.25rem;
  box-shadow: var(--shadow-2);
}

.profile-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.profile-menu li.separator {
  border-bottom: 1px solid var(--surface-border);
  margin: 0.5rem 0;
}

.profile-menu li:hover {
  background: var(--surface-hover);
}

.profile-menu li i {
  margin-right: 0.5rem;
}
</style>



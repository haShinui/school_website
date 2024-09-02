import { reactive } from 'vue';

export const eventBus = reactive({
  isAuthenticated: false,
  setIsAuthenticated(value) {
    this.isAuthenticated = value;
  },
});

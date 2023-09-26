import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const colorTheme = ref('dark');
  function toggleColorTheme() {
    colorTheme.value = colorTheme.value === 'dark' ? 'light' : 'dark';
  }
  return { colorTheme, toggleColorTheme };
});
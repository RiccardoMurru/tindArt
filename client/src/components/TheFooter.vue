<script setup lang="ts">
  import { useThemeStore } from '@/stores/theme';

  const store = useThemeStore();

  // const emits = defineEmits(['change-color-theme']);
  function changeColorTheme() {
    store.toggleColorTheme();
  }
</script>

<template>
  <footer>
    <!-- <router-link to="/settings" class="icon-settings"></router-link> -->
    <button class="icon-theme" @click="changeColorTheme"></button>
    <router-link to="/" class="icon-home"></router-link>
    <router-link to="/my-artworks" class="icon-gallery"></router-link>
  </footer>
</template>

<style lang="postcss" scoped>
  footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 65px;
    margin-top: auto;
    background: var(--colorBackground);
    color: var(--color-text);
  }
  span {
    &::before {
      font-size: 40px;
    }
  }
  .icon-theme {
    &::before {
      content: '\e518';
      font-family: 'Material Symbols Rounded';
      font-size: 30px;
    }
  }
  .light {
    .icon-theme {
      &::before {
        content: '\e51c';
      }
    }
  }
  .icon-home {
    &::before {
      content: '\e88a';
      font-family: 'Material Symbols Rounded';
      font-size: 30px;
    }
  }

  .icon-gallery {
    &::before {
      content: '\e413';
      font-family: 'Material Symbols Rounded';
      font-size: 30px;
    }
  }
  .router-link-active,
  .router-link-exact-active {
    &::before {
      color: var(--accentColor);
    }
  }
</style>

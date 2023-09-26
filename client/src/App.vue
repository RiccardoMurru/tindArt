<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterView } from 'vue-router';
  import { useThemeStore } from '@/stores/theme';

  const theme = useThemeStore();
</script>

<template>
  <div :class="theme.colorTheme">
    <RouterView :class="theme.$state" />
  </div>
</template>

<style>
  .dark,
  .light {
    height: 100%;
  }

  .dark {
    --accentColor: #dbbc2f;
    --color-text: #fff;
    --colorBackground: #001524;
    --secondaryBackground: #000912;
    --backgroundListItem: rgba(255, 255, 255, 0.02);
    --modalText: #fff;
    * {
      transition: all .15s ease-out;
    }
  }
  .light {
    --accentColor: #dbbc2f;
    --color-text: #001524;
    --colorBackground: #fff;
    --secondaryBackground: #003049;
    --backgroundListItem: rgba(0, 21, 36, .05);
    --modalText: #fff;
    * {
      transition: all .15s ease-out;
    }
  }
</style>

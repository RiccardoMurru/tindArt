<script setup lang="ts">
import ArtworkList from './ArtworkList.vue';
</script>

<template>
  <main>
    <ArtworkList />
  </main>
</template>

<style lang="postcss" scoped>
  main {
    padding: 0 10px;
    background: var(--colorBackground);
    color: var(--color-text);
  }
</style>

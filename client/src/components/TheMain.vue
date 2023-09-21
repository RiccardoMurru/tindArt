<script setup lang="ts">
import ArtworkItem from './ArtworkItem.vue';

</script>

<template>
  <main>
    <ArtworkItem />
  </main>
</template>

<style lang="postcss" scoped>
  main {
    position: relative;
    width: 100%;
    height: calc(100% - 130px);
    padding: 0 5px;
  }
</style>

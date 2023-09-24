<script setup lang="ts">
  import type { FavoriteArtwork } from '@/types';
  const props = defineProps<{
    artwork: FavoriteArtwork;
  }>();
</script>
<template>
  <img :src="artwork.thumbnail" :alt="artwork.title" />
  <div class="info">
    <h2 class="title">{{ artwork.title }}</h2>
    <p>{{ artwork.date }}</p>
  </div>
</template>

<style lang="postcss" scoped>
  img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
  }
  .info {
    max-width: calc(100% - 100px);
    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>

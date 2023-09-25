<script setup lang="ts">
  import type { FavoriteArtwork } from '@/types';

  const props = defineProps<{
    artwork: FavoriteArtwork;
  }>();

  const emits = defineEmits(['show-artwork']);

  async function showArtwork(artwork: FavoriteArtwork) {
    emits('show-artwork', { artwork });
  }
</script>

<template>
  <div class="artwork-details" @click="showArtwork(artwork)">
    <img :src="artwork.thumbnail" :alt="artwork.title" />
    <div class="info">
      <h2 class="title">{{ artwork.title }}</h2>
      <p>{{ artwork.artists }}</p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .artwork-details {
    display: flex;
    gap: 1rem;
    width: 100%;
  }
  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
  }
  .info {
    max-width: calc(100% - 100px);
    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 21px;
    }
  }
</style>

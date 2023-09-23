<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ArtworkListItem from './ArtworkListItem.vue';
  import { getFavoriteArtworks } from '@/apiService';
  import type { FavoriteArtwork } from '@/types';

  const favoriteArtworks = ref<FavoriteArtwork[]>([]);

  onMounted(async () => {
    favoriteArtworks.value = await getFavoriteArtworks();
  });
</script>

<template>
  <h1>My Artworks</h1>
  <ul>
    <li v-for="favoriteArtwork in favoriteArtworks"
        :key="favoriteArtwork.id">
        <ArtworkListItem :artwork="favoriteArtwork" />
      </li>
  </ul>
</template>

<style lang="postcss" scoped>
h1 {
  margin: 20px 0;
}
ul {
  overflow-y: auto;
  height: calc(100% - 50px);
}
li {
  display: flex;
  gap: 1rem;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

</style>

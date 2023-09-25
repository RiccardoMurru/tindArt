<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ArtworkListItem from './ArtworkListItem.vue';
  import ArtworkModal from './ArtworkModal.vue';
  import { getFavoriteArtworks } from '@/apiService';
  import type { FavoriteArtwork } from '@/types';

  const favoriteArtworks = ref<FavoriteArtwork[]>([]);
  let artworkModal = ref<FavoriteArtwork>();
  let showModal = ref<boolean>(false);

  function handleShowArtwork(artwork: FavoriteArtwork) {
    artworkModal.value = artwork;
    handleToggleModal()
  }

  function handleToggleModal() {
    showModal.value = !showModal.value;
  }

  onMounted(async () => {
    favoriteArtworks.value = await getFavoriteArtworks();
  });
</script>

<template>
  <h1>Art Gallery</h1>
  <ul>
    <li v-for="favoriteArtwork in favoriteArtworks" :key="favoriteArtwork.id">
      <ArtworkListItem
        :artwork="favoriteArtwork"
        @show-artwork="handleShowArtwork(favoriteArtwork)" />
    </li>
  </ul>
  <Transition name="modal">
    <ArtworkModal
      v-if="showModal"
      :artwork="artworkModal!"
      @close-modal="handleToggleModal" />
  </Transition>
</template>

<style lang="postcss" scoped>
  h1 {
    margin: 10px 0 20px 0;
    font-size: 27px;
  }
  ul {
    overflow-y: auto;
    height: calc(100% - 110px);
  }
  li {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
  .modal-enter-active,
  .modal-leave-active {
    transition: top 0.25s ease;
  }

  .modal-enter-from {
    top: 100%;
  }
  .modal-enter-to {
    top: 65px;
  }
  .modal-leave-from {
    top: 65px;
  }
  .modal-leave-to {
    top: 100%;
  }
</style>

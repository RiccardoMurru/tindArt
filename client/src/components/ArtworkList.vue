<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ArtworkListItem from './ArtworkListItem.vue';
  import ArtworkModal from './ArtworkModal.vue';
  import { getFavoriteArtworks, unlikeArtwork } from '@/apiService';
  import type { FavoriteArtwork } from '@/types';

  const favoriteArtworks = ref<FavoriteArtwork[]>([]);
  let artworkModal = ref<FavoriteArtwork>();
  let showModal = ref<boolean>(false);

  function showArtwork(artwork: FavoriteArtwork) {
    artworkModal.value = artwork;

    handleToggleModal();
  }

  function handleToggleModal() {
    showModal.value = !showModal.value;
  }

  async function handleRemoveArtwork(artwork: FavoriteArtwork) {
    const index = favoriteArtworks.value.indexOf(artwork);
    favoriteArtworks.value.splice(index, 1);
    try {
      artwork.isFavorite = false;
      artwork.isNotLiked = true;
      await unlikeArtwork(artwork);
      console.log(`removed ${artwork.title}`);
    } catch (error) {
      console.log(error);
    }
  }

  onMounted(async () => {
    favoriteArtworks.value = await getFavoriteArtworks();
  });
</script>

<template>
  <ul>
    <TransitionGroup name="list">
      <li
        v-for="favoriteArtwork in favoriteArtworks"
        :key="favoriteArtwork.id"
        @click.stop="showArtwork(favoriteArtwork)">
        <ArtworkListItem
          :artwork="favoriteArtwork"
          @remove-artwork="handleRemoveArtwork(favoriteArtwork)" />
      </li>
    </TransitionGroup>
  </ul>
  <Transition name="modal">
    <ArtworkModal
      v-if="showModal"
      :artwork="artworkModal!"
      @close-modal="handleToggleModal" />
  </Transition>
</template>

<style lang="postcss" scoped>
  ul {
    padding: 20px 0;
    overflow-y: auto;
    height: 100%;
  }
  li {
    position: relative;
    padding-bottom: 15px;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
    background: var(--backgroundListItem);
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  .list-move, /* apply transition to moving elements */
  .list-enter-active,
  .list-leave-active {
      transition: transform .25 ease-in;
    }

  .list-enter-from,
  .list-leave-to {
    transform: translateX(-100%);
  }

  /* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
  .list-leave-active {
    position: absolute;
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

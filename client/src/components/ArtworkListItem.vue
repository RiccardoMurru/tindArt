<script setup lang="ts">
  import { ref } from 'vue';
  import type { FavoriteArtwork } from '@/types';

  const removeArtworkNotification = ref<boolean>(false);

  const props = defineProps<{
    artwork: FavoriteArtwork;
  }>();

  const emits = defineEmits(['click', 'remove-artwork']);

  async function removeArtwork(artwork: FavoriteArtwork) {
    emits('remove-artwork');
    toggleRemoveNotification();
  }

  function toggleRemoveNotification() {
    removeArtworkNotification.value = !removeArtworkNotification.value;
  }
</script>

<template>
  <div class="artwork-details">
    <img :src="artwork.thumbnail" :alt="artwork.title" />
    <div class="info">
      <h2 class="title">{{ artwork.title }}</h2>
      <p>{{ artwork.artists }}</p>
    </div>
    <div class="controls">
      <button
        class="icon-close"
        @click.stop="toggleRemoveNotification"></button>
    </div>
  </div>
  <Transition>
    <div v-if="removeArtworkNotification" class="remove-artwork">
      <div class="notification-controls">
        <button class="icon-keep" @click.stop="toggleRemoveNotification">
          Keep
        </button>
        <button class="icon-remove" @click.stop="removeArtwork(artwork)">
          Remove
        </button>
      </div>
    </div>
  </Transition>
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
    max-width: calc(100% - 120px);
    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 18px;
      color: var(--accentColor);
    }
    p {
      font-size: 14px;
    }
  }
  .controls {
    margin-left: auto;
  }
  .icon-close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    &::before {
      content: '\e5cd';
      font-size: 25px;
      color: var(--color-text);
    }
  }

  .remove-artwork {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: var(--secondaryBackground);
    border-radius: 10px;
  }
  .notification-controls {
    display: flex;
    justify-content: center;
    gap: 50px;
  }
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--modalText);
    line-height: 1.2;
    font-weight: 600;
    font-size: 16px;
  }
  .icon-keep {
    &::before {
      content: '\e86c';
      font-size: 30px;
    }
  }
  .icon-remove {
    &::before {
      content: '\e5c9';
      font-size: 30px;
    }
  }

  .v-enter-from {
    left: 100%;
  }
  .v-enter-to {
    left: 0;
  }
  .v-leave-from {
    left: 0;
  }
  .v-leave-to {
    left: 100%;
  }
  .v-enter-active {
    transition: left 0.25s ease-out;
  }
  .v-leave-active {
    transition: left 0.25s ease-in;
  }
</style>

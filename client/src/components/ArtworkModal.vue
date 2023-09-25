<script setup lang="ts">
  import type { FavoriteArtwork } from '@/types';

  const props = defineProps<{
    artwork: FavoriteArtwork;
  }>();

  const emits = defineEmits(['close-modal']);

  function closeModal () {
    emits('close-modal');
  }
</script>

<template>
  <div class="artwork-modal">
    <div class="details">
      <button class="icon-close" @click="closeModal"></button>
      <img :src="artwork.image" :alt="artwork.title" />
      <div class="title-details">
        <h1>{{ artwork.title }}</h1>
        <h2>{{ artwork.artists }}</h2>
      </div>
      <div class="artwork-details">
        <p class="date">{{ artwork.date }}</p>
        <h2>{{ artwork.collecting_institution }}</h2>
        <p>{{ artwork.medium }}, {{ artwork.dimensions }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .artwork-modal {
    position: fixed;
    top: 65px;
    left: 5px;
    width: calc(100vw - 10px);
    height: 100vh;
    padding: 50px 10px 10px 10px;
    border-radius: 20px 20px 0 0 ;
    background: var(--secondaryBackground);
    z-index: 10;
    overflow-y: auto;
    line-height: 1.2;
  }

  .details {
    height: calc(100% - 70px);
    overflow-y: auto;
  }

  h1 {
    font-size: 23px;
    margin: 10px 0 20px 0;
  }
  h2 {
    font-size: 21px;
    margin-bottom: 20px;
  }
  .artwork-details {
    .date {
      margin-bottom: 10px;
    }
    h2 {
      font-size: 19px;
      margin-bottom: 10px;
    }
  }
  .icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    &::before {
        content: '\e5cd';
        font-size: 25px;
        color: #fff;
      }
  }
  span {
    font-size: .7em;
  }
  img {
    max-width: 100%;
    margin: 0;
  }
</style>

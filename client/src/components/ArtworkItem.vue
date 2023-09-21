<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getArtworks } from '@/apiService';
  import type { Artwork } from '@/types';

  const artworksData = ref<Artwork[]>([]);
  const animationDirection = ref<string>('');

  onMounted(async () => {
    const artworks = await getArtworks();
    artworksData.value = artworks
      .map(artwork => ({
        id: artwork.id,
        title: artwork.title,
        imgPath: artwork._links!.image.href.replace('{image_version}', 'large'),
      }))
      .reverse();
  });

  function likeArtwork(artwork: Artwork) {
    const index = artworksData.value.indexOf(artwork);
    artworksData.value.splice(index, 1);
    animationDirection.value = 'right';
  }

  function unlikeArtwork(artwork: Artwork) {
    const index = artworksData.value.indexOf(artwork);
    artworksData.value.splice(index, 1);
    animationDirection.value = 'left';
  }
</script>

<template>
  <TransitionGroup :name="animationDirection" tag="div" >
    <div
      class="artwork"
      v-for="artworkData in artworksData"
      :key="artworkData.id.toString()">
      <img
        :src="artworkData.imgPath.toString()"
        :alt="artworkData.title.toString()" />
      <div class="title">
        {{ artworkData.title }}
      </div>
      <div class="controls">
        <button class="icon-like" @click="likeArtwork(artworkData)"></button>
        <button
          class="icon-unlike"
          @click="unlikeArtwork(artworkData)"></button>
      </div>
    </div>
  </TransitionGroup>
</template>

<style scoped lang="postcss">
  .artwork {
    position: absolute;
    width: calc(100% - 10px);
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  .title {
    position: absolute;
    bottom: 20px;
    left: 20px;
    max-width: calc(100% - 40px);
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 17px;
    font-weight: 600;
    padding: 10px 15px;
    border-radius: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .controls {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    .icon-unlike,
    .icon-like {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid;
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    .icon-unlike {
      border-color: #8d99ae;

      &::before {
        content: '\e5cd';
        font-size: 25px;
        color: #8d99ae;
      }
    }
    .icon-like {
      border-color: #ef233c;
      &::before {
        content: '\e87d';
        font-size: 25px;
        color: #ef233c;
      }
    }
  }

  .left-leave-active,
  .right-leave-active {
    transition: all 1s ease;
  }

  .left-leave-to {
    opacity: 0;
    transform: translateX(-40px);
  }
  .right-leave-to {
    opacity: 0;
    transform: translateX(40px);
  }

  .left-leave-from,
  .right-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
</style>

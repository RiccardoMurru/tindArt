<script setup lang="ts">
  import { ref, onMounted } from 'vue';
import { getArtworks } from '@/apiService';
import { size } from '@/apiConfig';
  import type { Artwork } from '@/types';
  import Hammer from 'hammerjs'; //library for gesture handling - can't touch this 🎶

  const artworksData = ref<Artwork[]>([]);
  const animationDirection = ref<string>('');
  let offset = ref<number>(0);

  function swipe(artwork: Artwork) {
    const el = document.getElementById(artwork.id);
    const movingArtwork = new Hammer(el!);

    movingArtwork.add(
      new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 })
    );

    movingArtwork.on('panstart', () => {
      artwork.isMoving = true;
    });

    movingArtwork.on('pan', ev => {
      if (!el || !artwork.isMoving) return;

      const width = el.clientWidth;

      let posX = ev.deltaX;
      el.style.left = `${posX}px`;
      // el.style.transform = `translateX(${posX}px)`;
      const threshold = width / 2;

      if (ev.isFinal) {
        if (ev.offsetDirection === 4 && posX > threshold) {
          //direction 4 = right
          likeArtwork(artwork, 'like');
        } else if (ev.offsetDirection === 2 && width + posX < threshold) {
          //direction 2 = left
          likeArtwork(artwork, 'unlike');
        } else {
          // el.style.transform = 'translateX(0)';
          el.style.top = '0';
          el.style.left = '5px';
        }
        artwork.isMoving = false;
      }
    });
  }

  async function getNewArtworks() {
    const artworks = await getArtworks(offset.value);

    artworksData.value = [...artworksData.value, ...artworks.map(artwork => ({
      id: artwork.id,
      title: artwork.title,
      imgPath: artwork._links!.image.href.replace('{image_version}', 'large'),
      isMoving: false,
    }))].reverse();
    offset.value += size;
  }

  onMounted(async () => {
    getNewArtworks();
  });

  function likeArtwork(artwork: Artwork, action: string) {
    const index = artworksData.value.indexOf(artwork);
    artworksData.value.splice(index, 1);
    if (action === 'like') {
      animationDirection.value = 'right';
    } else if (action === 'unlike') {
      animationDirection.value = 'left';
    }

    //this is not doing what is supposed to do - kind of
    if (artworksData.value.length === 0) {
      getNewArtworks();
    }
  }
</script>

<template>
  <TransitionGroup :name="animationDirection" tag="div">
    <div
      :id="artworkData.id"
      class="artwork"
      v-for="artworkData in artworksData"
      :key="artworkData.id"
      @touchstart="swipe(artworkData)">
      <img :src="artworkData.imgPath" :alt="artworkData.title" />
      <div class="title">
        {{ artworkData.title }}
      </div>
      <div class="controls">
        <button
          class="icon-like"
          @click="likeArtwork(artworkData, 'like')"></button>
        <button
          class="icon-unlike"
          @click="likeArtwork(artworkData, 'unlike')"></button>
      </div>
    </div>
  </TransitionGroup>
</template>

<style scoped lang="postcss">
  .artwork {
    position: absolute;
    width: calc(100% - 10px);
    height: 100%;
    /* transition: left .1s linear, right .1s linear; */
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
    transition: all 0.8s ease;
  }

  .left-leave-to {
    transform: translateX(-120%) rotate(15deg);
  }
  .right-leave-to {
    transform: translateX(120%) rotate(-15deg);
  }

  .left-leave-from,
  .right-leave-from {
    transform: translateX(0);
  }
</style>

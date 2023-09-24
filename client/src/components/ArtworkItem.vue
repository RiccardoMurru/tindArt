<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import type { Artwork } from '@/types';
  import Hammer from 'hammerjs'; //library for gesture handling - can't touch this 🎶

  let isMoving = ref<boolean>(false);

  const props = defineProps<{
    artwork: Artwork;
  }>();

  const emits = defineEmits(['like-artwork']);

  function swipe(artwork: Artwork) {
    const el = document.getElementById(artwork.id);
    const movingArtwork = new Hammer(el!);

    movingArtwork.add(
      new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 })
    );

    movingArtwork.on('panstart', () => {
      isMoving.value = true;
    });

    movingArtwork.on('pan', ev => {
      if (!el || !isMoving.value) return;

      const width = el.clientWidth;

      let posX = ev.deltaX;
      el.style.left = `${posX}px`;
      // el.style.transform = `translateX(${posX}px)`;
      const threshold = width / 2;

      if (ev.isFinal) {
        isMoving.value = false;
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
      }
    });
  }

  async function likeArtwork(artwork: Artwork, action: string) {
    emits('like-artwork', { artwork, action });
  }
</script>

<template>
    <div
      :id="artwork.id"
      class="artwork"
      @touchstart="swipe(artwork)">
      <img :src="artwork.image" :alt="artwork.title" />
      <div class="title">
        {{ artwork.title }}
      </div>
      <div class="controls">
        <button
          class="icon-like"
          @click="likeArtwork(artwork, 'like')"></button>
        <button
          class="icon-unlike"
          @click="likeArtwork(artwork, 'unlike')"></button>
      </div>
    </div>
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
</style>

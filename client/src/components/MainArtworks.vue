<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue';
  import ArtworkItem from './ArtworkItem.vue';
  import {
    getArtworks,
    getArtworksFromDb,
    addArtwork,
    getArtist,
    addFavoriteArtwork,
    unlikeArtwork,
  } from '@/apiService';
  import { size } from '@/apiConfig';
  import type { Artwork } from '@/types';

  const artworksData = reactive<Artwork[]>([]);
  let offset = ref<number>(0);
  let animationDirection = ref<string>('');

  async function getNewArtworks() {
    //get artworks from api
    const artworks = await getArtworks(offset.value);

    //format artworks
    const formattedArtworks = artworks.map(artwork => ({
      id: artwork.id,
      title: artwork.title,
      image: artwork._links!.image.href.replace('{image_version}', 'large'),
      medium: artwork.medium,
      date: artwork.date,
      dimensions: artwork.dimensions,
      collecting_institution: artwork.collecting_institution,
      _links: artwork._links,
      isFavorite: false,
      isNotLiked: false,
      artists: '',
    }));

    //add artworks to db
    for (let i = 0; i < formattedArtworks.length; i++) {
      await addArtwork(formattedArtworks[i]);
    }
    // formattedArtworks.forEach(artwork => {
    //   addArtwork(artwork);
    // });

    const artworksFromDb = await getArtworksFromDb();

    //set state as artworks from db

    artworksData.push(...artworksFromDb.reverse());


    offset.value += size;

  }

  async function handleLikeArtwork(artwork: Artwork, action: string) {
    const index = artworksData.indexOf(artwork);
    artworksData.splice(index, 1);
    if (action === 'like') {
      animationDirection.value = 'right';
      try {
        artwork.artists = await getArtist(artwork);
      } catch (error) {
        console.log(error);
      }
      artwork.isFavorite = true;
      addFavoriteArtwork(artwork);
    } else if (action === 'unlike') {
      animationDirection.value = 'left';
      artwork.isNotLiked = true;
      unlikeArtwork(artwork);
    }
  }

  watch(
    () => artworksData,
    newArtworksData => {
      if (newArtworksData.length === 0) {
        getNewArtworks();
      }
    },
    {
      deep: true,
    }
  );
  onMounted(async () => {
    getNewArtworks();
  });
</script>

<template>
  <main>
    <TransitionGroup :name="animationDirection">
      <ArtworkItem
        v-for="artworkData in artworksData"
        :key="artworkData.id"
        :artwork="artworkData"
        @like-artwork="handleLikeArtwork(artworkData, $event.action)" />
    </TransitionGroup>
  </main>
</template>

<style lang="postcss">
  main {
    position: relative;
    width: 100%;
    height: calc(100% - 130px);
    padding: 5px;
    background: var(--colorBackground);
    color: var(--color-text);
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

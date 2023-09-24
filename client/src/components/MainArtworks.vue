<script setup lang="ts">
  import { onMounted, ref } from 'vue';
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

  const artworksData = ref<Artwork[]>([]);
  let offset = ref<number>(0);
  let animationDirection = ref<string>('');

  async function getNewArtworks() {
    //get artworks from api
    const artworks = await getArtworks(offset.value);

    console.log('fetch', artworks);

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

    console.log(formattedArtworks);

    //add artworks to db
    formattedArtworks.forEach(artwork => {
      addArtwork(artwork);
    });

    const artworksFromDb = await getArtworksFromDb();

    //set state as artworks from db
    artworksData.value.push(...artworksFromDb.reverse());

    offset.value += size;
  }

  async function handleLikeArtwork(artwork: Artwork, action: string) {
    const index = artworksData.value.indexOf(artwork);
    artworksData.value.splice(index, 1);
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
    //this is not doing what is supposed to do - kind of
    if (artworksData.value.length === 0) {
      getNewArtworks();
    }
  }

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
    padding: 0 5px;
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

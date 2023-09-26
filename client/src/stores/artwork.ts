import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getArtist, addFavoriteArtwork, unlikeArtwork } from '@/apiService';
import type { Artwork } from '@/types';

export const useArtworkStore = defineStore('artwork', () => {
  const artworksData = ref<Artwork[]>([]);

  function setArtworks (artworks: Artwork[]) {
    artworksData.value = artworks;
  }
  async function likeArtwork(artwork: Artwork) {
    const index = artworksData.value.indexOf(artwork);
    if (index !== -1) {
      artwork.artists = await getArtist(artwork);
      artwork.isFavorite = true;
      addFavoriteArtwork(artwork);
      setArtworks(artworksData.value.filter(item => item !== artwork));
    }
  }
  async function notLikeArtwork (artwork: Artwork) {
    const index = artworksData.value.indexOf(artwork);
    if (index !== -1) {
      artwork.isNotLiked = true;
      unlikeArtwork(artwork);
      setArtworks(artworksData.value.filter(item => item !== artwork));
    }
  }
  return {artworksData, setArtworks, likeArtwork, notLikeArtwork };
});

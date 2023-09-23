import { apiUrl, token, size } from './apiConfig'

import type { Artwork } from './types';

export async function getArtworks(page: number): Promise <Artwork[]> {
  const response = await fetch(`${apiUrl}/artworks?size=${size}&page=${page}`, {
    method: 'GET',
    headers: {
      "X-XAPP-Token": token
    }
  })
  const data = await response.json();
  const artworks = data._embedded.artworks;
  return artworks;
}
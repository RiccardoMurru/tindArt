import { apiUrl, token, size  } from './apiConfig'
import type { Artwork } from './types';

const serverUrl = 'http://localhost:3000';

export async function getArtworks(offset: number): Promise <Artwork[]> {
  const response = await fetch(`${apiUrl}/artworks?size=${size}&offset=${offset}`, {
    method: 'GET',
    headers: {
      "X-XAPP-Token": token
    }
  })
  const data = await response.json();
  const artworks = data._embedded.artworks;

  return artworks;
}

export async function addArtwork(artwork: Artwork) {
  const response = await fetch(`${serverUrl}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(artwork),
  });
  console.log(JSON.stringify(artwork));

  console.log(response);
}
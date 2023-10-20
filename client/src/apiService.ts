import { apiUrl, token, size } from './apiConfig';
import type { Artwork } from './types';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function getArtworks(offset: number): Promise<Artwork[]> {
  const response = await fetch(
    `${apiUrl}/artworks?size=${size}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        'X-XAPP-Token': token,
      },
    }
  );

  const data = await response.json();
  const artworks = data._embedded.artworks;
  return artworks;
}

export async function getArtworksFromDb() {
  const response = await fetch(`${serverUrl}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export async function getArtist(artwork: Artwork) {
  const response = await fetch(`${artwork._links?.artists.href}`, {
    method: 'GET',
    headers: {
      'X-XAPP-Token': token,
    },
  });
  const data = await response.json();
  const artist = data._embedded.artists;
  return artist[0].name;
}

export async function addArtwork(artwork: Artwork) {
  await fetch(`${serverUrl}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(artwork),
  });
}

export async function addFavoriteArtwork(artwork: Artwork) {
  await fetch(`${serverUrl}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(artwork),
  });
}

export async function getFavoriteArtworks() {
  const response = await fetch(`${serverUrl}/my-artworks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export async function unlikeArtwork(artwork: Artwork) {
  await fetch(`${serverUrl}/unlike`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(artwork),
  });
}

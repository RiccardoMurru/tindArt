export interface Artwork {
  id: string;
  title: string;
  imgPath: string;
  _links?: LinkObject;
  isMoving?: boolean;
}

interface LinkObject {
  thumbnail: Link;
  image: Link;
  partner: Link;
  self: Link;
  permalink: Link;
  genes: Link;
  artists: Link;
  similar_artworks: Link;
  collection_users: Link;
  sale_artworks: Link;
}

interface Link {
  href: string;
  templated?: boolean;
}

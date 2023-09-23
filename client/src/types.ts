export interface Artwork {
  id: string;
  title: string;
  imgPath: string;
  medium: string;
  date: string;
  dimensions: DimensionObject;
  collecting_institution: string;
  _links?: LinkObject;
  isMoving?: boolean;
  liked: boolean;
}

export interface FavoriteArtwork extends Artwork {
  thumbnail: string;
  image: string;
}
interface DimensionObject {
  in: Dimensions;
  cm: Dimensions;
}

interface Dimensions {
  text?: string;
  height?: any;
  width?: any;
  depth?: any;
  diameter?: any
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

export interface Artwork {
  id: String;
  title: String;
  imgPath: String;
  _links?: LinkObject;
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
  href: String;
  templated?: Boolean;
}

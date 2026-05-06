export type PosterImage = {
  id: string;
  image_url: string;
  download_url: string;
  file_name: string;
  sort_order: number;
  type: "feed" | "story";
};

export type ClientPoster = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  images: PosterImage[];
};

export type Client = {
  id: string;
  client_name: string;
  job: string;
  slug: string;
  avatar_url: string;
  posters: ClientPoster[];
};

export type ContentData = {
  clients: Client[];
};

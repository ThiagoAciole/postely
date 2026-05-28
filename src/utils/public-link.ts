import type { Client, ClientPoster, PosterFormat } from "../types/content";
import { slugify } from "./slugify";

export function getClientRouteSlug(client: Client) {
  return client.id || client.slug || slugify(client.client_name);
}

export function getPosterRouteSlug(poster: ClientPoster) {
  return slugify(poster.title) || poster.id;
}

export function buildClientPath(client: Client) {
  return `/${getClientRouteSlug(client)}`;
}

export function buildPosterPath(client: Client, poster: ClientPoster, format?: PosterFormat) {
  const path = `${buildClientPath(client)}/${getPosterRouteSlug(poster)}`;
  return format ? `${path}?format=${format}` : path;
}

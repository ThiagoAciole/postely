import type { Client, ClientPoster } from "../types/content";
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

export function buildPosterPath(client: Client, poster: ClientPoster) {
  return `${buildClientPath(client)}/${getPosterRouteSlug(poster)}`;
}

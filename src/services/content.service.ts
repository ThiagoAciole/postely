import type { Client, ClientPoster, ContentData } from "../types/content";
import { slugify } from "../utils/slugify";

const MOCK_PATH = "/mock/postely-mock.json";

function matchesClientSlug(client: Client, routeSlug: string) {
  return (
    routeSlug === client.id ||
    routeSlug === client.slug ||
    routeSlug === slugify(client.client_name)
  );
}

function matchesPosterSlug(poster: ClientPoster, routeSlug: string) {
  return routeSlug === poster.id || routeSlug === slugify(poster.title);
}

export async function getContentData() {
  const response = await fetch(MOCK_PATH);
  if (!response.ok) throw new Error("Não foi possível carregar o JSON de conteúdo.");
  return (await response.json()) as ContentData;
}

export async function getClientBySlug(clientSlug: string) {
  const data = await getContentData();
  return data.clients.find((client) => matchesClientSlug(client, clientSlug)) ?? null;
}

export async function getPosterByClientAndSlug(clientSlug: string, posterSlug: string) {
  const client = await getClientBySlug(clientSlug);
  if (!client) return null;
  const poster = client.posters.find((item) => matchesPosterSlug(item, posterSlug)) ?? null;
  return poster ? { client, poster } : null;
}

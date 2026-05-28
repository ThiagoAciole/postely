import { useEffect, useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  ExternalLink,
  Film,
  Images,
  LayoutPanelTop,
  Smartphone,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { getClientBySlug } from "../../services/content.service";
import type { Client, PosterFormat } from "../../types/content";
import { buildPosterPath } from "../../utils/public-link";
import "./style.css";

const POSTERS_PER_PAGE = 6;

const POSTER_TABS: Array<{
  label: string;
  value: PosterFormat;
  icon: typeof Images;
}> = [
  { label: "Feed", value: "feed", icon: Images },
  { label: "Story", value: "story", icon: Smartphone },
  { label: "Reels", value: "reels", icon: Film },
];

function getPosterExcerpt(subtitle: string) {
  return subtitle
    .replace(/\s+/g, " ")
    .replace(/[#@][\wÀ-ÿ_]+/g, "")
    .trim();
}

function formatPosterDate(date: string) {
  const [datePart, timePart] = date.split("T");
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return date;
  const time = timePart?.slice(0, 5);
  return time ? `${day}/${month}/${year} ${time}` : `${day}/${month}/${year}`;
}

function sortPostersByMostRecent(posters: Client["posters"]) {
  return [...posters].sort(
    (firstPoster, secondPoster) =>
      new Date(secondPoster.published_at).getTime() -
      new Date(firstPoster.published_at).getTime(),
  );
}

function getPosterFormats(poster: Client["posters"][number]) {
  return poster.formats?.length
    ? poster.formats
    : Array.from(new Set(poster.images.map((image) => image.type)));
}

function getPosterImagesByFormat(poster: Client["posters"][number], format: PosterFormat) {
  return poster.images.filter((image) => image.type === format);
}

function getPosterCoverByFormat(poster: Client["posters"][number], format: PosterFormat) {
  return getPosterImagesByFormat(poster, format)[0]?.image_url ?? poster.cover;
}

export function ClientPosters() {
  const { clientSlug } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [activeFormat, setActiveFormat] = useState<PosterFormat>("feed");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!clientSlug) return;
      setLoading(true);
      setError(null);
      try {
        const foundClient = await getClientBySlug(clientSlug);
        setClient(foundClient);
        setActiveFormat("feed");
        setCurrentPage(1);
      } catch {
        setError("Erro ao carregar cliente.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clientSlug]);

  const formatCounts = POSTER_TABS.reduce(
    (counts, tab) => ({
      ...counts,
      [tab.value]: client?.posters.filter((poster) =>
        getPosterFormats(poster).includes(tab.value),
      ).length ?? 0,
    }),
    {} as Record<PosterFormat, number>,
  );
  const filteredPosters = client
    ? client.posters.filter((poster) => getPosterFormats(poster).includes(activeFormat))
    : [];
  const sortedPosters = sortPostersByMostRecent(filteredPosters);
  const totalPages = Math.max(1, Math.ceil(sortedPosters.length / POSTERS_PER_PAGE));
  const currentPagePosters = sortedPosters.slice(
    (currentPage - 1) * POSTERS_PER_PAGE,
    currentPage * POSTERS_PER_PAGE,
  );

  return (
    <main className="client-posters-container client-posters-page-space">
      {loading ? <LoadingState /> : null}
      {!loading && error ? <EmptyState title="Ops!" message={error} /> : null}
      {!loading && !error && !client ? (
        <EmptyState
          title="Cliente não encontrado"
          message="Verifique o link e tente novamente."
        />
      ) : null}

      {!loading && !error && client ? (
        <section className="client-posters-page">
          <div className="client-posters-identity">
            <div className="client-posters-profile">
              <Avatar className="client-posters-avatar">
                {client.avatar_url ? (
                  <AvatarImage src={client.avatar_url} alt={client.client_name} />
                ) : (
                  <AvatarFallback>{client.client_name.slice(0, 1).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <h1>{client.client_name}</h1>
                <p className="client-posters-muted">
                  {client.job}
                  <BadgeCheck size={18} strokeWidth={2.6} />
                </p>
              </div>
            </div>

            <div className="client-posters-count-pill">
              <LayoutPanelTop size={18} />
              <div>
                <strong>{client.posters.length} Posters</strong>
                <span>Disponíveis</span>
              </div>
            </div>
          </div>

          <div className="client-posters-tabs" role="tablist" aria-label="Tipos de poster">
            {POSTER_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFormat === tab.value;

              return (
                <button
                  key={tab.value}
                  className={`client-posters-tab ${
                    isActive ? "client-posters-tab-active" : ""
                  }`.trim()}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveFormat(tab.value);
                    setCurrentPage(1);
                  }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  <strong>{formatCounts[tab.value]}</strong>
                </button>
              );
            })}
          </div>

          {currentPagePosters.length > 0 ? (
            <div className="client-posters-grid">
              {currentPagePosters.map((poster) => (
              <Card key={poster.id} className="client-posters-card">
                <div className="client-posters-card-cover">
                  <Badge className="client-posters-slide-badge">
                    <Images size={13} />
                    {getPosterImagesByFormat(poster, activeFormat).length} Slides
                  </Badge>
                  <img
                    src={getPosterCoverByFormat(poster, activeFormat)}
                    alt={poster.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <CardContent className="client-posters-card-content">
                  <span className="client-posters-date">
                    {formatPosterDate(poster.published_at)}
                  </span>
                  <h3>{poster.title}</h3>
                  <p>{getPosterExcerpt(poster.subtitle)}</p>

                  <Button
                    className="client-posters-link-button"
                    onClick={() =>
                      (window.location.href = buildPosterPath(client, poster, activeFormat))
                    }
                  >
                    Visualizar e Baixar
                    <ExternalLink size={15} />
                  </Button>
                </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              title={`Nenhum poster de ${POSTER_TABS.find((tab) => tab.value === activeFormat)?.label}`}
              message="Quando esse tipo for adicionado ao mock, ele aparece automaticamente nesta aba."
            />
          )}

          {totalPages > 1 ? (
            <nav className="client-posters-pagination" aria-label="Paginação">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`client-posters-page-button ${
                    currentPage === page ? "client-posters-page-button-active" : ""
                  }`.trim()}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ))}
              <button
                className="client-posters-page-button"
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
              >
                <ChevronRight size={19} />
              </button>
            </nav>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}

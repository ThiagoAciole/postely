import { useEffect, useState } from "react";
import { BadgeCheck, ChevronRight, ExternalLink, Images, LayoutPanelTop } from "lucide-react";
import { useParams } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { getClientBySlug } from "../../services/content.service";
import type { Client } from "../../types/content";
import { buildPosterPath } from "../../utils/public-link";
import "./style.css";

const POSTERS_PER_PAGE = 6;

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

export function ClientPosters() {
  const { clientSlug } = useParams();
  const [client, setClient] = useState<Client | null>(null);
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
        setCurrentPage(1);
      } catch {
        setError("Erro ao carregar cliente.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clientSlug]);

  const sortedPosters = client ? sortPostersByMostRecent(client.posters) : [];
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

          <div className="client-posters-grid">
            {currentPagePosters.map((poster) => (
              <Card key={poster.id} className="client-posters-card">
                <div className="client-posters-card-cover">
                  <Badge className="client-posters-slide-badge">
                    <Images size={13} />
                    {poster.images.length} Slides
                  </Badge>
                  <img
                    src={poster.cover}
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
                      (window.location.href = buildPosterPath(client, poster))
                    }
                  >
                    Visualizar e Baixar
                    <ExternalLink size={15} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

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

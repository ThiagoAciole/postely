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

function getPosterExcerpt(subtitle: string) {
  return subtitle
    .replace(/\s+/g, " ")
    .replace(/[#@][\wÀ-ÿ_]+/g, "")
    .trim();
}

function formatPosterDate(date: string) {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
}

export function ClientPosters() {
  const { clientSlug } = useParams();
  const [client, setClient] = useState<Client | null>(null);
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
      } catch {
        setError("Erro ao carregar cliente.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clientSlug]);

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
            {client.posters.map((poster) => (
              <Card key={poster.id} className="client-posters-card">
                <div className="client-posters-card-cover">
                  <Badge className="client-posters-slide-badge">
                    <Images size={13} />
                    {poster.images.length} Slides
                  </Badge>
                  <img src={poster.cover} alt={poster.title} loading="lazy" />
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

          <nav className="client-posters-pagination" aria-label="Paginação">
            <button className="client-posters-page-button client-posters-page-button-active">
              1
            </button>
            <button className="client-posters-page-button">2</button>
            <button className="client-posters-page-button">3</button>
            <button className="client-posters-page-button" aria-label="Próxima página">
              <ChevronRight size={19} />
            </button>
          </nav>
        </section>
      ) : null}
    </main>
  );
}

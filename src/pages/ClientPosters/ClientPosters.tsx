import { useEffect, useState } from "react";
import { BadgeCheck, LayoutPanelTop } from "lucide-react";
import { useParams } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Header } from "../../components/Header/Header";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { getClientBySlug } from "../../services/content.service";
import type { Client } from "../../types/content";
import { buildPosterPath } from "../../utils/public-link";
import { Button } from "../../components/Button/Button";
import "./style.css";

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
    <div>
      <Header />
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
              {client.avatar_url ? (
                <img
                  className="client-posters-avatar-image"
                  src={client.avatar_url}
                  alt={client.client_name}
                />
              ) : (
                <div className="client-posters-avatar">
                  {client.client_name.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <h1>{client.client_name}</h1>
                <p className="client-posters-muted">
                  {client.job}
                  <BadgeCheck size={18} strokeWidth={2.6} />
                </p>
              </div>

              <div className="client-posters-count-pill">
                <LayoutPanelTop size={16} />
                <span>{client.posters.length} Posters</span>
              </div>
            </div>

            <h2 className="client-posters-section-title">Posters</h2>
            <p className="client-posters-subtitle">
              Explore e Baixe os Posters para serem publicados
            </p>

            <div className="client-posters-grid">
              {client.posters.map((poster) => (
                <article key={poster.id} className="client-posters-card">
                  <div className="client-posters-card-cover">
                    <img src={poster.cover} alt={poster.title} loading="lazy" />
                  </div>
                  <div className="client-posters-card-content">
                    <h3>{poster.title}</h3>
                    <p>{poster.subtitle}</p>
                    <div className="client-posters-meta"></div>

                    <Button
                      className="client-posters-link-button"
                      onClick={() =>
                        (window.location.href = buildPosterPath(client, poster))
                      }
                    >
                      Acessar
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

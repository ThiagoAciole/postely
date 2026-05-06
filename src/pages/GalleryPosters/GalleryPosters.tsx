import { useEffect, useState } from "react";
import { ArrowLeft, Copy, LayoutPanelTop } from "lucide-react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Header } from "../../components/Header/Header";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { getPosterByClientAndSlug } from "../../services/content.service";
import type { ClientPoster, PosterImage } from "../../types/content";
import { CaptionCard } from "./components/CaptionCard/CaptionCard";
import { PosterGrid } from "./components/PosterGrid/PosterGrid";
import "./style.css";

export function GalleryPosters() {
  const { clientSlug, posterSlug } = useParams();
  const [poster, setPoster] = useState<ClientPoster | null>(null);
  const [images, setImages] = useState<PosterImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!clientSlug || !posterSlug) return;
      setLoading(true);
      setError(null);
      try {
        const result = await getPosterByClientAndSlug(clientSlug, posterSlug);
        if (!result) {
          setPoster(null);
          setImages([]);
          return;
        }
        setPoster(result.poster);
        setImages(
          [...result.poster.images].sort((a, b) => a.sort_order - b.sort_order),
        );
      } catch {
        setError("Erro ao carregar poster.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clientSlug, posterSlug]);

  return (
    <div>
      <Header />
      <main className="gallery-posters-container gallery-posters-page-space">
        {loading ? <LoadingState /> : null}
        {!loading && error ? <EmptyState title="Ops!" message={error} /> : null}
        {!loading && !error && !poster ? (
          <EmptyState
            title="Poster não encontrado"
            message="Verifique o link e tente novamente."
          />
        ) : null}
        {!loading && !error && poster ? (
          <section className="gallery-posters-layout">
            <Link to={`/${clientSlug}`} className="gallery-posters-back-link">
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </Link>

            <div className="gallery-posters-title-row">
              <h1 className="gallery-posters-title">{poster.title}</h1>
              <div className="gallery-posters-count-pill">
                <Copy size={16} />
                <span>{images.length} Slides</span>
              </div>
            </div>

            <CaptionCard caption={poster.subtitle} />
            <div className="gallery-posters-grid-header">
              <LayoutPanelTop size={18} />
              <span>Arquivos do Poster</span>
            </div>
            <PosterGrid posters={images} />
          </section>
        ) : null}
      </main>
    </div>
  );
}

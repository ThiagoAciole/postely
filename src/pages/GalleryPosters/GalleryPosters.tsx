import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Images,
  MoreHorizontal,
} from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { Button } from "../../components/ui/button";
import { getPosterByClientAndSlug } from "../../services/content.service";
import type { Client, ClientPoster, PosterFormat, PosterImage } from "../../types/content";
import storyMockup from "../../assets/mockup.png";
import { CaptionCard } from "./components/CaptionCard/CaptionCard";
import "./style.css";

function isPosterFormat(value: string | null): value is PosterFormat {
  return value === "feed" || value === "story" || value === "reels";
}

export function GalleryPosters() {
  const { clientSlug, posterSlug } = useParams();
  const [searchParams] = useSearchParams();
  const selectedFormat = searchParams.get("format");
  const [client, setClient] = useState<Client | null>(null);
  const [poster, setPoster] = useState<ClientPoster | null>(null);
  const [images, setImages] = useState<PosterImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
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
          setClient(null);
          setPoster(null);
          setImages([]);
          return;
        }
        const filteredImages = isPosterFormat(selectedFormat)
          ? result.poster.images.filter((image) => image.type === selectedFormat)
          : result.poster.images;
        const sortedImages = [...filteredImages].sort(
          (a, b) => a.sort_order - b.sort_order,
        );
        setClient(result.client);
        setPoster(result.poster);
        setImages(sortedImages);
        setSelectedIndex(0);
      } catch {
        setError("Erro ao carregar poster.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clientSlug, posterSlug, selectedFormat]);

  const selectedImage = images[selectedIndex] ?? null;
  const isStoryPreview = selectedImage?.type === "story" || selectedFormat === "story";

  function goToPreviousSlide() {
    setSelectedIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  }

  function goToNextSlide() {
    setSelectedIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  }

  function handleDownloadAll() {
    images.forEach((image, index) => {
      window.setTimeout(() => {
        const anchor = document.createElement("a");
        anchor.href = image.download_url;
        anchor.download = image.file_name;
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }, index * 120);
    });
  }

  function handleDownloadSelected() {
    if (!selectedImage) return;

    const anchor = document.createElement("a");
    anchor.href = selectedImage.download_url;
    anchor.download = selectedImage.file_name;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  return (
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
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </Link>

          <header className="gallery-posters-heading">
            <h1 className="gallery-posters-title">{poster.title}</h1>
            <p className="gallery-posters-meta-line">
              <Images size={15} />
              <span>
                Carrossel<span className="gallery-posters-mobile-meta"> Educativo</span>
              </span>
              <span>•</span>
              <span>{images.length} slides</span>
              {client ? <span className="gallery-posters-client">{client.client_name}</span> : null}
            </p>
          </header>

          <div className="gallery-posters-content">
            <div className="gallery-posters-showcase">
              {selectedImage ? (
                <div
                  className={`gallery-posters-preview ${
                    isStoryPreview ? "gallery-posters-preview-story" : ""
                  }`.trim()}
                >
                  <img
                    className="gallery-posters-preview-image"
                    src={selectedImage.image_url}
                    alt={selectedImage.file_name}
                    decoding="async"
                  />
                  {isStoryPreview ? (
                    <img
                      className="gallery-posters-story-mockup"
                      src={storyMockup}
                      alt=""
                      aria-hidden="true"
                      decoding="async"
                    />
                  ) : null}
                  <button
                    className="gallery-posters-download-current"
                    type="button"
                    onClick={handleDownloadSelected}
                    aria-label="Baixar slide atual"
                  >
                    <Download size={18} />
                  </button>
                  {images.length > 1 ? (
                    <>
                      <button
                        className="gallery-posters-nav-button gallery-posters-nav-button-left"
                        type="button"
                        onClick={goToPreviousSlide}
                        aria-label="Slide anterior"
                      >
                        <ChevronLeft size={58} />
                      </button>
                      <button
                        className="gallery-posters-nav-button gallery-posters-nav-button-right"
                        type="button"
                        onClick={goToNextSlide}
                        aria-label="Próximo slide"
                      >
                        <ChevronRight size={58} />
                      </button>
                    </>
                  ) : null}
                </div>
              ) : null}

              <div className="gallery-posters-thumbnails" aria-label="Slides do poster">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={image.id}
                    className={`gallery-posters-thumbnail ${
                      selectedIndex === index ? "gallery-posters-thumbnail-active" : ""
                    }`.trim()}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Ver slide ${index + 1}`}
                  >
                    <img src={image.image_url} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
                {images.length > 4 ? (
                  <button
                    className="gallery-posters-thumbnail gallery-posters-thumbnail-more"
                    type="button"
                    onClick={() => setSelectedIndex(4)}
                    aria-label="Ver mais slides"
                  >
                    <MoreHorizontal size={28} />
                  </button>
                ) : null}
              </div>
            </div>

            <aside className="gallery-posters-side-panel">
              <CaptionCard caption={poster.subtitle} />
              <Button className="gallery-posters-action" onClick={handleDownloadAll}>
                <Download size={18} />
                Baixar Todos os Slides
              </Button>
            </aside>
          </div>
        </section>
      ) : null}
    </main>
  );
}

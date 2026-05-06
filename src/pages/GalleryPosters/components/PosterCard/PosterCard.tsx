import { Download } from "lucide-react";
import type { PosterImage } from "../../../../types/content";
import "./style.css";

export function PosterCard({ poster }: { poster: PosterImage }) {
  return (
    <article className="gallery-poster-item">
      <img src={poster.image_url} alt={poster.file_name} loading="lazy" />
      <a
        href={poster.download_url}
        download={poster.file_name}
        target="_blank"
        rel="noreferrer"
        className="gallery-poster-download"
      >
        <Download size={20} />
        Baixar
      </a>
    </article>
  );
}

import { Download } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import type { PosterImage } from "../../../../types/content";
import "./style.css";

export function PosterCard({ poster }: { poster: PosterImage }) {
  return (
    <Card className="gallery-poster-item">
      <img src={poster.image_url} alt={poster.file_name} loading="lazy" />
      <Button asChild className="gallery-poster-download">
        <a
          href={poster.download_url}
          download={poster.file_name}
          target="_blank"
          rel="noreferrer"
        >
          <Download size={20} />
          Baixar
        </a>
      </Button>
    </Card>
  );
}

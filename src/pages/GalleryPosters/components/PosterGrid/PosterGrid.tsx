import type { PosterImage } from "../../../../types/content";
import { PosterCard } from "../PosterCard/PosterCard";
import "./style.css";

export function PosterGrid({ posters }: { posters: PosterImage[] }) {
  return (
    <div className="gallery-poster-grid">
      {posters.map((poster) => (
        <PosterCard key={poster.id} poster={poster} />
      ))}
    </div>
  );
}

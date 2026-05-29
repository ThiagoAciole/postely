import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { copyToClipboard } from "../../../../utils/clipboard";
import "./style.css";

export function CaptionCard({ caption }: { caption: string }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const hasLongCaption = caption.length > 220;

  async function handleCopy() {
    await copyToClipboard(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Card className="gallery-caption-card">
      <div className="gallery-caption-header">
        <span className="gallery-caption-title">Legenda</span>
        <Button
          className="gallery-caption-copy-button"
          variant="outline"
          onClick={handleCopy}
          aria-label="Copiar legenda"
        >
          <Copy size={18} />
          {copied ? "Copiado!" : "Copiar"}
        </Button>
      </div>
      <p
        className={
          expanded || !hasLongCaption
            ? "gallery-caption-text"
            : "gallery-caption-text gallery-caption-truncated"
        }
      >
        {caption}
      </p>
      {hasLongCaption ? (
        <Button
          className="gallery-caption-more-button"
          variant="outline"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          {expanded ? "Ver Menos" : "Ver Mais"}
        </Button>
      ) : null}
    </Card>
  );
}

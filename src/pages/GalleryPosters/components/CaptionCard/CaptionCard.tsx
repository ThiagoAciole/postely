import { useState } from "react";
import { Copy, NotebookText } from "lucide-react";
import { Button } from "../../../../components/Button/Button";
import { copyToClipboard } from "../../../../utils/clipboard";
import "./style.css";

export function CaptionCard({ caption }: { caption: string }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function handleCopy() {
    await copyToClipboard(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="gallery-caption-card">
      <div className="gallery-caption-header">
        <div className="gallery-caption-title">
          <NotebookText size={16} />
          <span>Legenda</span>
        </div>
        <Button variant="secondary" onClick={handleCopy}>
          <Copy size={16} />
          {copied ? "Legenda copiada!" : "Copiar legenda"}
        </Button>
      </div>
      <p className={!expanded ? "gallery-caption-truncated" : ""}>{caption}</p>
      <Button variant="secondary" onClick={() => setExpanded((value) => !value)}>
        {expanded ? "Ver menos" : "Ver mais"}
      </Button>
    </div>
  );
}

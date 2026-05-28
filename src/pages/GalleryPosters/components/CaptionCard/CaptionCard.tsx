import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { copyToClipboard } from "../../../../utils/clipboard";
import "./style.css";

export function CaptionCard({ caption }: { caption: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyToClipboard(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Card className="gallery-caption-card">
      <div className="gallery-caption-header">
        <span className="gallery-caption-title">Legenda sugerida</span>
        <Button
          className="gallery-caption-icon-button"
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          aria-label="Copiar legenda"
        >
          <Copy size={21} />
        </Button>
      </div>
      <p className="gallery-caption-truncated">{caption}</p>
      <Button className="gallery-caption-copy-button" variant="outline" onClick={handleCopy}>
        <Copy size={18} />
        {copied ? "Legenda copiada!" : "Copiar Legenda"}
      </Button>
    </Card>
  );
}

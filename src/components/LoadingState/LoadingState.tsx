import { Card } from "../ui/card";
import "./style.css";

export function LoadingState({ text = "Carregando..." }: { text?: string }) {
  return <Card className="loading-state-card loading-state-center">{text}</Card>;
}

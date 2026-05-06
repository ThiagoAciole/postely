import "./style.css";

export function LoadingState({ text = "Carregando..." }: { text?: string }) {
  return <div className="loading-state-card loading-state-center">{text}</div>;
}

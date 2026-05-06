import "./style.css";

type Props = {
  title: string;
  message?: string;
};

export function EmptyState({ title, message }: Props) {
  return (
    <div className="empty-state-card empty-state-center">
      <h3>{title}</h3>
      {message ? <p className="empty-state-muted">{message}</p> : null}
    </div>
  );
}

import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Button } from "../Button/Button";
import "./style.css";

type Props = {
  admin?: boolean;
  onSignOut?: () => void;
};

export function Header({ admin, onSignOut }: Props) {
  return (
    <header className="header-root">
      <div className={`header-container ${admin ? "" : "header-center"}`.trim()}>
        <Link to="/" className="header-logo">
          <img src={logo} alt="Postely" className="header-logo-image" />
        </Link>
        {admin && onSignOut ? (
          <Button onClick={onSignOut} variant="secondary">
            Sair
          </Button>
        ) : null}
      </div>
    </header>
  );
}

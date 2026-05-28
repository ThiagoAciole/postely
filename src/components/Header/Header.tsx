import { Link } from "react-router-dom";
import { Moon } from "lucide-react";
import logo from "../../assets/logo.svg";
import { Button } from "../Button/Button";
import { Button as ShadcnButton } from "../ui/button";
import "./style.css";

type Props = {
  admin?: boolean;
  onSignOut?: () => void;
};

export function Header({ admin, onSignOut }: Props) {
  return (
    <header className="header-root">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <img src={logo} alt="Postely" className="header-logo-image" />
        </Link>
        {admin && onSignOut ? (
          <Button onClick={onSignOut} variant="secondary">
            Sair
          </Button>
        ) : (
          <div className="header-actions" aria-label="Acoes do aplicativo">
            <ShadcnButton
              className="header-icon-button"
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Alternar tema"
            >
              <Moon size={20} fill="currentColor" />
            </ShadcnButton>
          </div>
        )}
      </div>
    </header>
  );
}

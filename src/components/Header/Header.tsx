import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import logo from "../../assets/logo.svg";
import logoDark from "../../assets/logo2.svg";
import { Button } from "../Button/Button";
import { Button as ShadcnButton } from "../ui/button";
import "./style.css";

type Props = {
  admin?: boolean;
  onSignOut?: () => void;
};

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem("postely-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function Header({ admin, onSignOut }: Props) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("postely-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  const isDarkTheme = theme === "dark";

  return (
    <header className="header-root">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <img
            src={isDarkTheme ? logoDark : logo}
            alt="Postely"
            className="header-logo-image"
          />
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
              onClick={toggleTheme}
              aria-label={isDarkTheme ? "Ativar tema claro" : "Ativar tema escuro"}
              aria-pressed={isDarkTheme}
              title={isDarkTheme ? "Tema claro" : "Tema escuro"}
            >
              {isDarkTheme ? (
                <Sun size={20} fill="currentColor" />
              ) : (
                <Moon size={20} fill="currentColor" />
              )}
            </ShadcnButton>
          </div>
        )}
      </div>
    </header>
  );
}

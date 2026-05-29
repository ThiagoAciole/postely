import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import logoDark from "../assets/logo2.svg";
import { Header } from "../components/Header/Header";

export function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-layout-content">
        <Outlet />
      </div>
      <footer className="postely-footer">
        <div className="postely-footer-inner">
          <div className="postely-footer-brand">
            <img className="postely-footer-logo postely-footer-logo-light" src={logo} alt="Postely" />
            <img className="postely-footer-logo postely-footer-logo-dark" src={logoDark} alt="Postely" />
            <span>Postely © 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

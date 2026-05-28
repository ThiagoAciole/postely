import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Header } from "../components/Header/Header";

export function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <Outlet />
      <footer className="postely-footer">
        <div className="postely-footer-inner">
          <div className="postely-footer-brand">
            <img className="postely-footer-logo" src={logo} alt="Postely" />
            <span>Postely © 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

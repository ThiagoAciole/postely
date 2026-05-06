import { Navigate, Route, Routes } from "react-router-dom";
import { ClientPosters } from "../pages/ClientPosters/ClientPosters";
import { GalleryPosters } from "../pages/GalleryPosters/GalleryPosters";
import "./style.css";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tiberio" replace />} />
      <Route path="/:clientSlug" element={<ClientPosters />} />
      <Route path="/:clientSlug/:posterSlug" element={<GalleryPosters />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

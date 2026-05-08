// src/components/MainLayout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function MainLayout() {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer /> {/* ← уберите <footer> тег, он уже внутри Footer компонента */}
    </div>
  );
}

// src/components/MainLayout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <main className={styles.layout__main}>
        <Header />
        <div className={styles.layout__content}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

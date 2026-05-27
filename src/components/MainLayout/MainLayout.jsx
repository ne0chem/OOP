// src/components/MainLayout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import QuestionModal from "../QuestionModal/QuestionModal";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const openQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const closeQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isQuestionModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isQuestionModalOpen]);

  return (
    <div className={styles.layout}>
      <main className={styles.layout__main}>
        <div className={styles.layout__content}>
          <Header onOpenQuestionModal={openQuestionModal} />
          <div className={styles.layout__outlet}>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer onOpenQuestionModal={openQuestionModal} />
      <QuestionModal isOpen={isQuestionModalOpen} onClose={closeQuestionModal} />
    </div>
  );
}

import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { asset } from "../../utils/asset.js";

export default function Header({ onOpenQuestionModal }) {
  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container__header}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.logo__container}>
            <img className={styles.logo1} src={asset("/logo.svg")} alt="Logo" />
            <img className={styles.logo} src={asset("/logo1.svg")} alt="Logo 1" />
          </div>
          <nav className={styles.nav}>
            <Link className={styles.nav_color} to="/" onClick={handleNavClick}>
              Главная
            </Link>
            <Link
              className={styles.nav_color}
              to="/calendar"
              onClick={handleNavClick}
            >
              Календарь событий
            </Link>
            <Link
              className={styles.nav_color}
              to="/webinars"
              onClick={handleNavClick}
            >
              Все выпуски
            </Link>
            <Link
              className={styles.nav_color}
              to="/experts"
              onClick={handleNavClick}
            >
              Наши эксперты
            </Link>
            <Link className={styles.nav_color} to="/about" onClick={handleNavClick}>
              О нас
            </Link>
          </nav>
          <div></div>
          <button
            type="button"
            className={styles.questionBtn}
            onClick={onOpenQuestionModal}
          >
            Задай вопрос
          </button>
        </div>
      </div>
    </div>
  );
}

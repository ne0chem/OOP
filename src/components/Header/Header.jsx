import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.container__header}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.logo__container}>
            <img className={styles.logo1} src="/logo.svg" alt="Logo" />
            <img className={styles.logo} src="/logo1.svg" alt="Logo 1" />
          </div>
          <nav className={styles.nav}>
            <Link className={styles.nav_color} to="/">
              Главная
            </Link>
            <Link className={styles.nav_color} to="/calendar">
              Календарь событий
            </Link>
            <Link className={styles.nav_color} to="/webinars">
              Все выпуски
            </Link>
            <Link className={styles.nav_color} to="/experts">
              Наши эксперты
            </Link>
            <Link className={styles.nav_color} to="/about">
              О нас
            </Link>
          </nav>
          <div></div>
          <button className={styles.questionBtn}>Задай вопрос</button>
        </div>
      </div>
    </div>
  );
}

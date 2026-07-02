import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { asset } from "../../utils/asset.js";

const QUESTION_URL = "https://openedu.moscow/q";

const navLinks = [
  { to: "/", label: "Главная" },
  { to: "/calendar", label: "Календарь событий" },
  { to: "/webinars", label: "Все выпуски" },
  { to: "/experts", label: "Наши эксперты" },
  { to: "/about", label: "О нас" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
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
            {navLinks.map((link) => (
              <Link
                key={link.to}
                className={styles.nav_color}
                to={link.to}
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={QUESTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.questionBtn}
          >
            Задай вопрос
          </a>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenu_open : ""}`}
      >
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              className={styles.mobileNav__link}
              to={link.to}
              onClick={handleNavClick}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={QUESTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileNav__question}
            onClick={() => setMenuOpen(false)}
          >
            Задай вопрос
          </a>
        </nav>
      </div>
    </div>
  );
}

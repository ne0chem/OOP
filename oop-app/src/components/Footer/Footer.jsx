import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { asset } from "../../utils/asset.js";
export default function Footer({ onOpenQuestionModal }) {
  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className={styles.footer}>
        <div className="container">
          <div className={styles.footer__container}>
            <div className={styles.footer__top_top}>
              <div className={styles.footer__top}>
                <div className={styles.logo__container}>
                  <img className={styles.logo1} src={asset("/logo.svg")} alt="Logo" />
                  <img className={styles.logo} src={asset("/logo1.svg")} alt="Logo 1" />
                </div>
                <div className={styles.footer.top_bot}>
                  <p className={styles.footer__text}>
                    Университет Правительства Москвы Проект «Открытое
                    образовательное пространство»
                  </p>
                </div>
              </div>
              <nav className={styles.footer_nav}>
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
              <div className={styles.footer__link}>
                <div className={styles.footer__link_top}>
                  <p className={styles.footer__title}>
                    Есть вопрос или предложение?
                  </p>
                  <p className={styles.footer__text}>
                    Напишите нам — будем рады помочь
                  </p>
                </div>
                <div className={styles.footer__link_bot}>
                  <button
                    type="button"
                    className={styles.footer__button}
                    onClick={onOpenQuestionModal}
                  >
                    Задать вопрос
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.footer__top_contact}>
              <div className={styles.footer__top1}>
                <p className={styles.footer_contact}>
                  © 2026 Открытое образовательное пространство
                </p>
              </div>
              <div className={styles.footer__top2}>
                <p className={styles.footer_contact}>info@mguu.ru</p>
                <p className={styles.footer_contact}> +7 (495) 957-75-75</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

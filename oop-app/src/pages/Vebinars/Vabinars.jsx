import styles from "./Vebinars.module.css";
import { button } from "../../expert.js";
import { card } from "../../expert.js";
import { asset } from "../../utils/asset.js";
import { cnWow } from "../../utils/wow.js";

export default function Vabinars() {
  return (
    <div className={styles.vebinars__container}>
      <div className="container">
        <div className={styles.vebinars}>
          <div className={styles.vebinars__header}>
            <p {...cnWow(styles.vebinars__header__title, "fadeInUp")}>
              Коллекция прошедших вебинаров
            </p>
            <p
              {...cnWow(styles.vebinars__header__text, "fadeInUp", {
                delay: "0.1s",
              })}
            >
              Все записи наших вебинаров, подкастов и интервью в одном месте
            </p>
          </div>
          <div
            {...cnWow(styles.inputWrapper, "fadeInUp", { delay: "0.15s" })}
          >
            <div className={styles.input}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 15.5L19 19M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#6f6f6f"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input type="text" placeholder="Поиск..." />
            </div>
            <button className={styles.button}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 15.5L19 19M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="white"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div
            {...cnWow(styles.button__wrapper, "fadeIn", { delay: "0.2s" })}
          >
            {button.map((button, index) => (
              <button key={index} className={styles.button__card}>
                {button.name}
              </button>
            ))}
          </div>
          <div className={styles.effect__container}>
            <p></p>
            <div className={styles.effect__card}>
              <div className={styles.effect__card}></div>
            </div>
          </div>
        </div>
        <div
          {...cnWow(styles.vebinars__footer, "fadeInLeft", {
            delay: "0.1s",
          })}
        >
          <p className={styles.vebinars__footer__text}>
            Личная эффективность
          </p>
        </div>
        <div className={styles.cards__grid}>
          {card.map((item, index) => (
            <div
              key={item.id}
              {...cnWow(styles.card, "fadeInUp", {
                delay: `${0.05 + (index % 6) * 0.08}s`,
              })}
            >
              <div
                className={styles.card__image}
                style={{
                  backgroundImage: `url(${item.img || asset("/image.jpg")})`,
                }}
              >
                <button className={styles.play__button}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 3L19 12L5 21V3Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className={styles.card__overlay}>
                  <p className={styles.card__title}>{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

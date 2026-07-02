import styles from "./Expert.module.css";
import { asset } from "../../utils/asset.js";
import { cnWow } from "../../utils/wow.js";
import { useExperts } from "../../hooks/useExperts.js";

export default function Expert() {
  const { experts } = useExperts();

  return (
    <div className={styles.expert__container}>
      <div className="container">
        <div className={styles.expert__top}>
          <div className={styles.expert__header}>
            <p {...cnWow(styles.expert__header__title, "fadeInUp")}>
              Наши эксперты
            </p>
            <p
              {...cnWow(styles.expert__header__text, "fadeInUp", {
                delay: "0.1s",
              })}
            >
              Спикеры и практики из разных сфер: управления, психологии,
              коммуникаций, бизнеса и цифровой среды.
            </p>
          </div>

          <button
            type="button"
            {...cnWow(styles.expert__cta, "fadeInLeft", {
              delay: "0.15s",
            })}
          >
            <span>Стать экспертом</span>
            <img src={asset("/arrow.svg")} alt="" aria-hidden="true" />
          </button>
        </div>

        <div
          {...cnWow(styles.inputWrapper, "fadeInUp", { delay: "0.2s" })}
        >
          <div className={styles.input}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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
          <button
            type="button"
            className={styles.searchButton}
            aria-label="Поиск"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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

        <div className={styles.experts__grid}>
          {experts.map((expert, index) => (
            <article
              key={expert.id}
              {...cnWow(styles.expert__card, "fadeInUp", {
                delay: `${0.05 + (index % 6) * 0.08}s`,
              })}
            >
              <div className={styles.expert__photo}>
                <img src={expert.photo} alt={expert.name} />
                <div className={styles.expert__overlay}>
                  <p className={styles.expert__name}>{expert.name}</p>
                  <p className={styles.expert__role}>{expert.role}</p>
                  <p className={styles.expert__description}>
                    {expert.description}
                  </p>
                </div>
              </div>

              <div className={styles.expert__footer}>
                <div className={styles.expert__buttons}>
                  <button type="button" className={styles.btn__webinar}>
                    {expert.buttonText}
                  </button>
                  <span className={styles.btn__arr}>
                    <img src={asset("/arrow.svg")} alt="" aria-hidden="true" />
                  </span>
                </div>
                <p className={styles.expert__text}>{expert.footerText}</p>
              </div>
            </article>
          ))}
        </div>

        <div
          {...cnWow(styles.expert__bottom, "fadeIn", { delay: "0.15s" })}
        >
          <p className={styles.expert__bottom__text}>Все эксперты</p>
          <img src={asset("/arrowPink.svg")} alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

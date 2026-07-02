import styles from "./SprintSrtring.module.css";
export default function SprintSrtring() {
  return (
    <div className={styles.speed__string}>
      <div className="container">
        <p className={styles.text__speed}>
          <span>
            ВЕБИНАРЫ / ПОДСКАТЫ / ИНТЕРВЬЮ / КОНФЕРЕНЦИИ / БЕСПЛАТНО / ОНЛАЙН
          </span>
          <span className={styles.gap}></span>
          <span>
            ВЕБИНАРЫ / ПОДСКАТЫ / ИНТЕРВЬЮ / КОНФЕРЕНЦИИ / БЕСПЛАТНО / ОНЛАЙН
          </span>
          <span className={styles.gap}></span>
          <span>
            ВЕБИНАРЫ / ПОДСКАТЫ / ИНТЕРВЬЮ / КОНФЕРЕНЦИИ / БЕСПЛАТНО / ОНЛАЙН
          </span>
        </p>
      </div>
    </div>
  );
}

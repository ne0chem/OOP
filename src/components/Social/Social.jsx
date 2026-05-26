import styles from "./Social.module.css";

export default function About() {
  return (
    <div className={styles.social__container}>
      <div className="container">
        <div className={styles.social__container__dop}>
          <div className={styles.social__container__top}>
            <p className={styles.social__title}>Где смотреть наши вебинары</p>
            <p className={styles.social__subTitle}>
              Подписывайтесь на наши платформы, чтобы не пропустить новые
              вебинары, интервью и подкасты
            </p>
          </div>
          <div className={styles.social__container__bot}>
            <div className={styles.cocial__img__container}>
              <img className={styles.social__img} src="./vk.svg" alt="" />
            </div>

            <div className={styles.cocial__img__container}>
              <img className={styles.social__img} src="./rutube.svg" alt="" />
            </div>

            <div className={styles.cocial__img__container}>
              <img className={styles.social__img} src="./dzen.svg" alt="" />
            </div>

            <div className={styles.cocial__img__container}>
              <img className={styles.social__img} src="./un.svg" alt="" />
            </div>
            <div className={styles.cocial__img__container}>
              <img className={styles.social__img} src="./clip.svg" alt="" />
            </div>

            <div className={styles.cocial__img__container}>
              <img className={styles.social__img} src="./th.svg" alt="" />
            </div>

            <div className={styles.cocial__img__container}>
              <img className={styles.social__img} src="./tench.svg" alt="" />
            </div>

            <div className={styles.cocial__img__container}>
              <img className={styles.social__img} src="./max.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

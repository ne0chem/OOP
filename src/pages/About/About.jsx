import styles from "./About.module.css";
import SprintSrtring from "../../components/SprintSrtring/SprintSrtring.jsx";
import Social from "../../components/Social/Social.jsx";
export default function About() {
  return (
    <>
      <div className={styles.about}>
        <div className={styles.cool__container_new}>
          <div className="container">
            <div className={styles.cool__content}>
              <div className={styles.cool__content__top}>
                <div className={styles.cool__left__top}>
                  <p className={styles.text__title}>ОТКРЫТОЕ</p>
                  <p className={styles.text__red}>ОБРАЗОВАТЕЛЬНОЕ</p>
                  <p className={styles.text__title}>ПРОСТРАНСТВО</p>
                </div>
              </div>
              <div className={styles.cool__content__bot}>
                <div className={styles.cool__bot__top}>
                  <div className={styles.cool__icon__container}>
                    <img
                      className={styles.cool__icon}
                      src="./stat01.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className={styles.cool__text__info}>600+ </p>
                    <p className={styles.cool__text__infD}>вебинаров</p>
                  </div>
                </div>
                <div className={styles.cool__bot__center}>
                  <div>
                    <img
                      className={styles.cool__icon}
                      src="./stat2.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className={styles.cool__text__info}>100 000+ </p>
                    <p className={styles.cool__text__infD}>слушателей</p>
                  </div>
                  <div>
                    <img className={styles.img__rel} src="./mac.svg" alt="" />
                  </div>
                </div>
                <div className={styles.cool__bot__bot}>
                  <div>
                    <img
                      className={styles.cool__icon}
                      src="./stat3.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className={styles.cool__text__info}>20+</p>
                    <p className={styles.cool__text__infD}>тематик</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SprintSrtring />
        <div className={styles.about__container}>
          <div className="container">
            <div className={styles.about__top}>
              <p className={styles.about__title}>История создания </p>
              <div className={styles.top_dop}>
                <div className={styles.about__top_left}>
                  <div className={styles.about__imgLT}>
                    {/* <img
                    className={styles.about__imgL1}
                    src="./micro1.png"
                    alt=""
                  />
                  <img
                    className={styles.about__imgL2}
                    src="./icon.svg"
                    alt=""
                  /> */}
                  </div>
                  <div>
                    <p className={styles.about__textLT}>
                      В 2020 году, когда мир ушёл в самоизоляцию, мы заметили,
                      как многим из нас стало не хватать живого общения,
                      экспертного мнения и возможности перенимать опыт и учиться
                      у профессионалов. А множество онлайн курсов имели закрытый
                      или платный доступ.
                    </p>
                  </div>
                </div>
                <div className={styles.about__top_right}>
                  <div className={styles.about__top_RL}>
                    <div className={styles.about__textRTT}>
                      <p className={styles.about__textRT}>
                        Тогда и родилась идея Открытого образовательного
                        пространства (ООП). Пространства для развития и обмена
                        опытом, которое будет доступно всем.
                      </p>
                    </div>
                    <div className={styles.about__top_RR}>
                      <div className={styles.about__top_IMG}></div>
                      <div className={styles.about__top_TXT}>
                        <p className={styles.about__TXT}>
                          Мы стали приглашать экспертов из разных областей
                          знания, чтобы поговорить с ними в прямом эфире. Именно
                          такой формат позволял всем желающим легко
                          присоединиться к беседе и задать вопрос эксперту
                          из любой точки мира.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.pricip__container}>
                <div className={styles.about__bot}>
                  <div className={styles.about__bot_left}>
                    <p className={styles.about__bot_left_title}>ООП сейчас</p>
                    <p className={styles.about__bot_left_subtitle}>
                      На 2026 год наша коллекция насчитывает более 600 выпусков,
                      подкастов и интервью на различные темы карьеры и личной
                      жизни.
                    </p>
                    <p className={styles.about__bot_left_subtitle}>
                      Мы приглашаем профессионалов своего дела из HR, бизнеса,
                      государственного управления, IT, образования, психологии,
                      медицины и других сфер, чтобы они поделились своими
                      знаниями и опытом.
                    </p>
                  </div>
                  <div className={styles.about__bot_right}>
                    <p className={styles.about__prin_title}>
                      Наш главный принцип
                    </p>
                    <p className={styles.about__prin_text}>
                      Образование должно быть доступным.
                    </p>
                  </div>
                </div>
                <div className={styles.vera}>
                  <p className={styles.vera__text}>
                    Мы верим, что знания — это базовая потребность человека.
                    Особенно в мире, который меняется быстрее, чем мы успеваем
                    привыкнуть к новому.
                  </p>
                  <p className={styles.vera__text}>
                    Поэтому все наши выпуски мы делаем бесплатными, чтобы любой
                    желающий имел доступ к полезной информации.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.bot}>
              <p className={styles.bot__title}>Для кого этот проект?</p>
              <p className={styles.bot_subtitle}>
                Для всех, кто хочет расти и саморазвиваться.
              </p>
              <div className={styles.bot__container}>
                <div className={styles.bot__conteiner_info}>
                  <img className={styles.bot__icon} src="./stat2.svg" alt="" />
                  <p className={styles.text_work}>Для руководителей</p>
                  <p className={styles.text_work_tezt}>
                    которые ищут новые инструменты управления.
                  </p>
                </div>

                <div className={styles.bot__conteiner_info}>
                  <img className={styles.bot__icon} src="./stat2.svg" alt="" />
                  <p className={styles.text_work}>Для специалистов</p>
                  <p className={styles.text_work_tezt}>
                    которые хотят следить за изменениями.
                  </p>
                </div>

                <div className={styles.bot__conteiner_info}>
                  <img className={styles.bot__icon} src="./stat2.svg" alt="" />
                  <p className={styles.text_work}>Для студентов</p>
                  <p className={styles.text_work_tezt}>
                    которые хотят слышать не только теорию, но и реальные кейсы.
                  </p>
                </div>

                <div className={styles.bot__conteiner_last}>
                  <p className={styles.text_last}>
                    И просто для всех любознательных.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Social />
      </div>
    </>
  );
}

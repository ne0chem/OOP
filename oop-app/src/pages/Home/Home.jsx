import styles from "./Main.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
import Social from "../../components/Social/Social.jsx";
import { asset } from "../../utils/asset.js";
import { Link } from "react-router-dom";
import { cnWow } from "../../utils/wow.js";
import { useExperts } from "../../hooks/useExperts.js";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const pastWebinars = [
  {
    id: 1,
    image: asset("/image.jpg"),
    duration: "32:40",
    tag: "#Психология",
    title: "Эмоциональный интеллект: зачем он нужен и как развивать",
  },
  {
    id: 2,
    image: asset("/image2.jpg"),
    duration: "40:14",
    tag: "#Личная эффективность",
    title: "Публичные выступления: от страха к уверенности",
  },
  {
    id: 3,
    image: asset("/image3.jpg"),
    duration: "25:18",
    tag: "#Лидерство",
    title: "Подкаст: Цифровая трансформация бизнеса",
  },
  {
    id: 4,
    image: asset("/image4.jpg"),
    duration: "52:10",
    tag: "#Личная эффективность",
    title: "Как управлять своим временем: техники и инструменты",
  },
];

export default function Main() {
  const { experts } = useExperts();
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const paginationRef = useRef(null);

  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.page}>
      <div className={styles.main__container}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.left__top}>
              <p {...cnWow(styles.text__title, "fadeInLeft", { delay: "0.1s" })}>
                ОТКРЫТОЕ
              </p>
              <p {...cnWow(styles.text__red, "fadeInLeft", { delay: "0.2s" })}>
                ОБРАЗОВАТЕЛЬНОЕ
              </p>
              <p {...cnWow(styles.text__title, "fadeInLeft", { delay: "0.3s" })}>
                ПРОСТРАНСТВО
              </p>
              <p {...cnWow(styles.text, "fadeInLeft", { delay: "0.4s" })}>
                Бесплатные вебинары и интервью с ведущими экспертами. ООП —
                среда для саморазвития, доступная каждому.
              </p>

              <div
                {...cnWow(styles.container__button, "fadeInUp", {
                  delay: "0.55s",
                })}
              >
                <Link
                  to="/webinars"
                  className={styles.button__osn}
                  onClick={handleNavClick}
                >
                  <p>Смотреть записи</p>
                  <img src={asset("/arrow.svg")} alt="" />
                </Link>
                <Link
                  to="/calendar"
                  className={styles.button__dop}
                  onClick={handleNavClick}
                >
                  Календарь событий
                </Link>
              </div>
            </div>

            <div
              {...cnWow(styles.images, "fadeInRight", {
                delay: "0.35s",
                duration: "1.2s",
              })}
            >
              <img
                className={styles.micro__icon}
                src={asset("/mikro.svg")}
                alt=""
              />
              <img className={styles.icon} src={asset("/icon.svg")} alt="" />
            </div>
          </div>
        </div>
      </div>

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

      <div className={styles.webinar__container}>
        <div className="container">
          <div className={styles.webinar__top}>
            <p {...cnWow(styles.webinar__title, "fadeInUp")}>
              Ближайший вебинар
            </p>
            <div
              {...cnWow(
                `${styles.webinar__right} ${styles.webinar__right_desktop}`,
                "fadeIn",
                { delay: "0.15s" },
              )}
            >
              <Link
                to="/calendar"
                className={styles.webinar__header__text}
                onClick={handleNavClick}
              >
                Все мероприятия
              </Link>
              <img
                className={styles.webinar__header__img}
                src={asset("/arrowPink.svg")}
                alt=""
              />
            </div>
          </div>

          <div
            {...cnWow(styles.webinar__bot, "fadeInUp", {
              delay: "0.1s",
              duration: "0.9s",
            })}
          >
            <div
              {...cnWow(styles.container__img, "fadeInLeft", {
                delay: "0.2s",
              })}
            >
              <img src={asset("/q.jpg")} alt="Вебинар" />
            </div>

            <div
              {...cnWow(styles.info__container, "fadeInRight", {
                delay: "0.25s",
              })}
            >
              <div className={styles.container__top}>
                <div className={styles.info}>
                  <div className={styles.container__time}>
                    <img
                      className={styles.container__time__img}
                      src={asset("/Clock.svg")}
                      alt=""
                    />
                    <p className={styles.text__time}>18:00 МСК</p>
                  </div>
                  <div className={styles.container__time}>
                    <img src={asset("/Calendar.svg")} alt="" />
                    <p className={styles.text__time}>5 апреля 2026</p>
                  </div>
                  <div className={styles.container__time}>
                    <p className={styles.text__time}>#Коммуникация</p>
                  </div>
                </div>
                <div className={styles.container__text}>
                  <p className={styles.container__text__category}>
                    «Язык доверия: как государству общаться с гражданами».
                  </p>
                </div>
              </div>

              <div className={styles.button__conteiner}>
                <div className={styles.container__bot}>
                  <div className={styles.info__speacker}>
                    <div className={styles.speacker}>
                      <img
                        className={styles.container__img__speacer}
                        src={asset("/q1.png")}
                        alt="Спикер"
                      />
                    </div>
                  </div>
                  <div className={styles.speacker__info}>
                    <p className={styles.speacker__title}>Анна Иванова</p>
                    <p className={styles.speacker__text}>
                      Руководитель проекта «Центр понятного языка», директор
                      программ ВШГУ РАНХиГС и автор книги «Министерство доверия.
                      Как государству общаться с гражданами».
                    </p>
                  </div>
                </div>
                <div className={styles.bu}>
                  <Link
                    to="/webinars"
                    className={styles.button__osn}
                    onClick={handleNavClick}
                  >
                    <p>Смотреть записи</p>
                    <img src={asset("/arrow.svg")} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            {...cnWow(
              `${styles.section__link} ${styles.section__link_mobile}`,
              "fadeIn",
              { delay: "0.2s" },
            )}
          >
            <Link
              to="/calendar"
              className={styles.webinar__header__text}
              onClick={handleNavClick}
            >
              Все мероприятия
            </Link>
            <img
              className={styles.webinar__header__img}
              src={asset("/arrowPink.svg")}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className={styles.webinras__video}>
        <div className="container">
          <div className={styles.webinar__top}>
            <p {...cnWow(styles.text_t, "fadeInUp")}>Прошедшие вебинары</p>
            <div
              {...cnWow(
                `${styles.webinar__right} ${styles.webinar__right_desktop}`,
                "fadeIn",
                { delay: "0.15s" },
              )}
            >
              <Link
                to="/webinars"
                className={styles.webinar__header__text}
                onClick={handleNavClick}
              >
                Все выпуски
              </Link>
              <img
                className={styles.webinar__header__img}
                src={asset("/arrowPink.svg")}
                alt=""
              />
            </div>
          </div>

          <div className={styles.video__grid}>
            {pastWebinars.map((video, index) => (
              <div
                key={video.id}
                {...cnWow(styles.video__card, "fadeInUp", {
                  delay: `${0.1 + index * 0.1}s`,
                })}
              >
                <img
                  className={styles.video__image}
                  src={video.image}
                  alt="Видео"
                />
                <div className={styles.video__duration}>
                  <img src={asset("/polugon.svg")} alt="Play" />
                  <span>{video.duration}</span>
                </div>
                <div className={styles.video__info}>
                  <div className={styles.video__category}>
                    <span>{video.tag}</span>
                  </div>
                  <h3 className={styles.video__title}>{video.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div
            {...cnWow(
              `${styles.section__link} ${styles.section__link_mobile}`,
              "fadeIn",
              { delay: "0.2s" },
            )}
          >
            <Link
              to="/webinars"
              className={styles.webinar__header__text}
              onClick={handleNavClick}
            >
              Все выпуски
            </Link>
            <img
              className={styles.webinar__header__img}
              src={asset("/arrowPink.svg")}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className={styles.expert__container}>
        <div className="container">
          <div className={styles.expetr__top}>
            <p {...cnWow(styles.text_t, "fadeInUp")}>Наши эксперты</p>
            <button
              {...cnWow(
                `${styles.button__osn1} ${styles.expert__btn_desktop}`,
                "fadeInLeft",
                { delay: "0.15s" },
              )}
            >
              <p>Стать экспертом</p>
              <img src={asset("/arrow.svg")} alt="" />
            </button>
          </div>

          <div
            {...cnWow(styles.expert__wrapper, "fadeInUp", {
              delay: "0.1s",
              duration: "0.9s",
            })}
          >
            <div className={styles.expert__header}>
              <h2
                {...cnWow(styles.expert__tx_dop, "fadeIn", {
                  delay: "0.15s",
                })}
              >
                Спикеры и практики из разных сфер: управления, психологии,
                коммуникаций, бизнеса и цифровой среды.{" "}
              </h2>
              <button
                {...cnWow(
                  `${styles.button__osn1} ${styles.expert__btn_mobile}`,
                  "fadeInUp",
                  { delay: "0.2s" },
                )}
              >
                <p>Стать экспертом</p>
                <img src={asset("/arrow.svg")} alt="" />
              </button>
              <div
                {...cnWow(styles.expert__nav, "fadeIn", { delay: "0.25s" })}
              >
                <p ref={prevRef} className={styles.swiper__prev}>
                  <img src={asset("/Arrow2.svg")} alt="Prev" />
                </p>
                <p ref={nextRef} className={styles.swiper__next}>
                  <img src={asset("/Arrow1.svg")} alt="Next" />
                </p>
              </div>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: { slidesPerView: 1.12, spaceBetween: 16 },
                640: { slidesPerView: 1.2, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1280: { slidesPerView: 4, spaceBetween: 30 },
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();

                swiper.params.pagination.el = paginationRef.current;
                swiper.pagination.init();
                swiper.pagination.update();
              }}
            >
              {experts.map((expert) => (
                <SwiperSlide key={expert.id}>
                  <div className={styles.expert__card}>
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
                        <button className={styles.btn__webinar}>
                          {expert.buttonText}
                        </button>
                        <p className={styles.btn__arr}>
                          <img src={asset("/arrow.svg")} alt="стрелка" />
                        </p>
                      </div>
                      <p className={styles.expert__text}>{expert.footerText}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              ref={paginationRef}
              className={styles.swiper__pagination}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.cool__container}>
        <div className="container">
          <div className={styles.cool__content}>
            <div className={styles.cool__content__top}>
              <div className={styles.cool__left__top}>
                <p {...cnWow(styles.text__title, "fadeInLeft", { delay: "0.1s" })}>
                  ОТКРЫТОЕ
                </p>
                <p {...cnWow(styles.text__red, "fadeInLeft", { delay: "0.2s" })}>
                  ОБРАЗОВАТЕЛЬНОЕ
                </p>
                <p {...cnWow(styles.text__title, "fadeInLeft", { delay: "0.3s" })}>
                  ПРОСТРАНСТВО
                </p>
              </div>
              <div
                {...cnWow(styles.cool__right__top, "fadeInRight", {
                  delay: "0.15s",
                })}
              >
                <p className={styles.cool__text}>
                  Проект, созданный в 2020 году. Команда проводит бесплатные
                  вебинары, подкасты, интервью и конференции с участием
                  экспертов из разных областей знаний.
                </p>
                <p className={styles.cool__text__dop}>
                  Цель проекта — сделать образование доступным и создать
                  пространство для развития и обмена опытом.
                </p>
                <Link
                  to="/about"
                  className={styles.webinar__right}
                  onClick={handleNavClick}
                >
                  <p className={styles.button__cool}>Подробнее</p>
                  <img src={asset("/arrowPink.svg")} alt="" />
                </Link>
              </div>
            </div>

            <div className={styles.cool__content__bot}>
              <div
                {...cnWow(styles.cool__bot__top, "fadeInUp", {
                  delay: "0.1s",
                })}
              >
                <div className={styles.cool__icon__container}>
                  <img
                    className={styles.cool__icon}
                    src={asset("/stat01.svg")}
                    alt=""
                  />
                </div>
                <div>
                  <p className={styles.cool__text__info}>600+ </p>
                  <p className={styles.cool__text__infD}>вебинаров</p>
                </div>
              </div>
              <div
                {...cnWow(styles.cool__bot__center, "fadeInUp", {
                  delay: "0.2s",
                })}
              >
                <div>
                  <img
                    className={styles.cool__icon}
                    src={asset("/stat2.svg")}
                    alt=""
                  />
                </div>
                <div>
                  <p className={styles.cool__text__info}>100 000+ </p>
                  <p className={styles.cool__text__infD}>слушателей</p>
                </div>
                <div>
                  <img
                    className={styles.img__rel}
                    src={asset("/mac.svg")}
                    alt=""
                  />
                </div>
              </div>
              <div
                {...cnWow(styles.cool__bot__bot, "fadeInUp", {
                  delay: "0.3s",
                })}
              >
                <div>
                  <img
                    className={styles.cool__icon}
                    src={asset("/stat3.svg")}
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

      <Social />
    </div>
  );
}

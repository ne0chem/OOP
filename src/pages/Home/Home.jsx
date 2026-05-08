import styles from "./Main.module.css";
import { expertsData } from "../../expert.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Main() {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const paginationRef = useRef(null);
  return (
    <div className="div">
      <div className={styles.main__container}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.left__top}>
              <p className={styles.text__title}>ОТКРЫТОЕ</p>
              <p className={styles.text__red}>ОБРАЗОВАТЕЛЬНОЕ</p>
              <p className={styles.text__title}>ПРОСТРАНСТВО</p>
              <p className={styles.text}>
                Бесплатные вебинары и интервью с ведущими экспертами. ООП —
                среда для саморазвития, доступная каждому.
              </p>

              <div className={styles.container__button}>
                <button className={styles.button__osn}>
                  <p>Смотреть записи</p>
                  <img src="/arrow.svg" alt="" />
                </button>
                <button className={styles.button__dop}>
                  Календарь событий
                </button>
              </div>
            </div>

            <div className={styles.images}>
              <img className={styles.micro__icon} src="/mikro.svg" alt="" />
              <img className={styles.icon} src="/icon.svg" alt="" />
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
            <p className={styles.webinar__title}>Ближайший вебинар</p>
            <div className={styles.webinar__right}>
              <p className={styles.webinar__header__text}>Все мероприятия</p>
              <img
                className={styles.webinar__header__img}
                src="./arrowPink.svg"
                alt=""
              />
            </div>
          </div>
          <div className={styles.webinar__bot}>
            <div className={styles.container__img}>
              <img src="/q.jpg" alt="Вебинар" />
            </div>

            {/* Правая часть 40% */}
            <div className={styles.info__container}>
              {/* Верхняя часть */}
              <div className={styles.container__top}>
                <div className={styles.info}>
                  <div className={styles.container__time}>
                    <img
                      className={styles.container__time__img}
                      src="./Clock.svg"
                      alt=""
                    />
                    <p className={styles.text__time}>18:00 МСК</p>
                  </div>
                  <div className={styles.container__time}>
                    <img src="./Calendar.svg" alt="" />

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

              {/* Нижняя часть */}
              <div className={styles.button__conteiner}>
                <div className={styles.container__bot}>
                  <div className={styles.info__speacker}>
                    <div className={styles.speacker}>
                      <img
                        className={styles.container__img__speacer}
                        src="/q1.png"
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
                  <button className={styles.button__osn}>
                    <p>Смотреть записи</p>
                    <img src="/arrow.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.webinras__video}>
        <div className="container">
          <div className={styles.webinar__top}>
            <p className={styles.text_t}>Прошедшие вебинары</p>
            <div className={styles.webinar__right}>
              <p className={styles.webinar__header__text}>Все выпуски</p>
              <img
                className={styles.webinar__header__img}
                src="./arrowPink.svg"
                alt=""
              />
            </div>
          </div>
          <div className={styles.video__grid}>
            {/* Карточка 1 */}
            <div className={styles.video__card}>
              <img
                className={styles.video__image}
                src="/image.jpg"
                alt="Видео"
              />
              <div className={styles.video__duration}>
                <img src="/polugon.svg" alt="Play" />
                <span>32:40</span>
              </div>
              <div className={styles.video__info}>
                <div className={styles.video__category}>
                  <span>#Психология</span>
                </div>
                <h3 className={styles.video__title}>
                  Эмоциональный интеллект: зачем он нужен и как развивать
                </h3>
              </div>
            </div>

            {/* Карточка 2 */}
            <div className={styles.video__card}>
              <img
                className={styles.video__image}
                src="/image2.jpg"
                alt="Видео"
              />
              <div className={styles.video__duration}>
                <img src="/polugon.svg" alt="Play" />
                <span>40:14</span>
              </div>
              <div className={styles.video__info}>
                <div className={styles.video__category}>
                  <span>#Личная эффективность</span>
                </div>
                <h3 className={styles.video__title}>
                  Публичные выступления: от страха к уверенности
                </h3>
              </div>
            </div>

            {/* Карточка 3 */}
            <div className={styles.video__card}>
              <img
                className={styles.video__image}
                src="/image3.jpg"
                alt="Видео"
              />
              <div className={styles.video__duration}>
                <img src="/polugon.svg" alt="Play" />
                <span>25:18</span>
              </div>
              <div className={styles.video__info}>
                <div className={styles.video__category}>
                  <span>#Лидерство</span>
                </div>
                <h3 className={styles.video__title}>
                  Подкаст: Цифровая трансформация бизнеса
                </h3>
              </div>
            </div>

            {/* Карточка 4 */}
            <div className={styles.video__card}>
              <img
                className={styles.video__image}
                src="/image4.jpg"
                alt="Видео"
              />
              <div className={styles.video__duration}>
                <img src="/polugon.svg" alt="Play" />
                <span>52:10</span>
              </div>
              <div className={styles.video__info}>
                <div className={styles.video__category}>
                  <span>#Личная эффективность</span>
                </div>
                <h3 className={styles.video__title}>
                  Как управлять своим временем: техники и инструменты
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.expert__container}>
        <div className="container">
          <div className={styles.expetr__top}>
            <p className={styles.text_t}>Наши эксперты</p>
            <button className={styles.button__osn}>
              <p>Стать экспертом</p>
              <img src="/arrow.svg" alt="" />
            </button>
          </div>

          <div className={styles.expert__wrapper}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true} // Добавляем бесконечную прокрутку
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              // Используем рефы для навигации
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
              {expertsData.map((expert) => (
                <SwiperSlide key={expert.id}>
                  <div className={styles.expert__card}>
                    {/* Верхний блок — фото */}
                    <div className={styles.expert__photo}>
                      <img src={expert.photo} alt={expert.name} />

                      {/* Описание (имя, должности) — поверх фото */}
                      <div className={styles.expert__overlay}>
                        <p className={styles.expert__name}>{expert.name}</p>
                        <p className={styles.expert__role}>{expert.role}</p>
                        <p className={styles.expert__description}>
                          {expert.description}
                        </p>
                      </div>
                    </div>

                    {/* Нижняя часть — кнопки и текст */}
                    <div className={styles.expert__footer}>
                      <div className={styles.expert__buttons}>
                        <button className={styles.btn__webinar}>
                          {expert.buttonText}
                        </button>
                        <button className={styles.btn__arr}>
                          <img src="/arrow.svg" alt="стрелка" />
                        </button>
                      </div>
                      <p className={styles.expert__text}>{expert.footerText}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Кнопки навигации с рефами */}
            <div ref={prevRef} className={styles.swiper__prev}>
              <img src="/arrow-prev.svg" alt="Prev" />
            </div>
            <div ref={nextRef} className={styles.swiper__next}>
              <img src="/arrow-next.svg" alt="Next" />
            </div>

            {/* Пагинация с рефом */}
            <div
              ref={paginationRef}
              className={styles.swiper__pagination}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

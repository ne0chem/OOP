import { useMemo, useState } from "react";
import styles from "./Calendar.module.css";

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const TEST_EVENT_TEMPLATE = {
  tag: "#Личная эффективность",
  name: "Как управлять своим временем: техники и инструменты",
  time: "18:00 (МСК)",
  speaker: "Алексей Петров",
  place: "Онлайн",
};

const EVENT_DAYS = [6, 12, 15, 20, 25];

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatEventDate(date) {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

function buildTestEvents() {
  const events = {};
  const year = new Date().getFullYear();

  for (let month = 0; month < 12; month += 1) {
    EVENT_DAYS.forEach((day) => {
      const date = new Date(year, month, day);
      if (date.getMonth() !== month) return;

      const key = toDateKey(date);
      events[key] = {
        ...TEST_EVENT_TEMPLATE,
        date: formatEventDate(date),
      };
    });
  }

  return events;
}

const EVENTS = buildTestEvents();

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildCalendarDays(year, month) {
  const days = [];
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let startDay = firstOfMonth.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i -= 1) {
    days.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      muted: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      date: new Date(year, month, day),
      muted: false,
    });
  }

  let nextDay = 1;
  while (days.length % 7 !== 0) {
    days.push({
      date: new Date(year, month + 1, nextDay),
      muted: true,
    });
    nextDay += 1;
  }

  return days;
}

function formatMonthTitle(date) {
  const title = date.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });
  return title.charAt(0).toUpperCase() + title.slice(1);
}

function findNearestEventDate(fromDate) {
  const keys = Object.keys(EVENTS).sort();
  const fromKey = toDateKey(fromDate);
  const nearestKey = keys.find((key) => key >= fromKey) ?? keys[0];

  if (!nearestKey) return fromDate;

  const [y, m, d] = nearestKey.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function Calendar() {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(() =>
    EVENTS[toDateKey(today)] ? today : findNearestEventDate(today),
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = useMemo(() => buildCalendarDays(year, month), [year, month]);

  const selectedEvent = EVENTS[toDateKey(selectedDate)];

  const goPrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day) => {
    setSelectedDate(day.date);
    if (day.muted) {
      setViewDate(new Date(day.date.getFullYear(), day.date.getMonth(), 1));
    }
  };

  const handleNearestClick = () => {
    const nearestDate = findNearestEventDate(today);
    setSelectedDate(nearestDate);
    setViewDate(new Date(nearestDate.getFullYear(), nearestDate.getMonth(), 1));
  };

  return (
    <div className={styles.calendar__container}>
      <div className="container">
        <div className={styles.calendar__head}>
          <p className={styles.calendar__title}>Календарь вебинаров</p>
          <p className={styles.calendar__subtitle}>
            Выберите дату, чтобы увидеть запланированные мероприятия
          </p>
        </div>

        <div className={styles.calendar__content}>
          <section className={styles.calendar__left}>
            <div className={styles.calendar__header}>
              <button
                type="button"
                className={styles.arrow}
                aria-label="Предыдущий месяц"
                onClick={goPrevMonth}
              >
                &#8249;
              </button>
              <p className={styles.month}>{formatMonthTitle(viewDate)}</p>
              <button
                type="button"
                className={styles.arrow}
                aria-label="Следующий месяц"
                onClick={goNextMonth}
              >
                &#8250;
              </button>
            </div>

            <div className={styles.weekdays}>
              {WEEK_DAYS.map((day) => (
                <p key={day} className={styles.weekday}>
                  {day}
                </p>
              ))}
            </div>

            <div className={styles.grid}>
              {days.map((day) => {
                const dateKey = toDateKey(day.date);
                const isSelected = isSameDay(day.date, selectedDate);
                const isToday = isSameDay(day.date, today);
                const hasEvent = Boolean(EVENTS[dateKey]);

                return (
                  <button
                    key={dateKey}
                    type="button"
                    className={[
                      styles.day,
                      day.muted ? styles.dayMuted : "",
                      isSelected ? styles.dayActive : "",
                      !isSelected && isToday ? styles.daySoft : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleDayClick(day)}
                  >
                    <span>{day.date.getDate()}</span>
                    {hasEvent ? <i className={styles.dot} /> : null}
                  </button>
                );
              })}
            </div>
          </section>

          <aside className={styles.event__side}>
            <h2 className={styles.event__title}>Ближайшие мероприятия</h2>

            {selectedEvent ? (
              <div className={styles.event__card}>
                <span className={styles.event__tag}>{selectedEvent.tag}</span>
                <p className={styles.event__name}>{selectedEvent.name}</p>

                <div className={styles.event__meta}>
                  <p>
                    <img src="/Calendar.svg" alt="" aria-hidden="true" />
                    {selectedEvent.date}
                  </p>
                  <p>
                    <img src="/Clock.svg" alt="" aria-hidden="true" />
                    {selectedEvent.time}
                  </p>
                  <p>
                    <img src="/User11.svg" alt="" aria-hidden="true" />
                    {selectedEvent.speaker}
                  </p>
                  <p>
                    <img src="/MapPin11.svg" alt="" aria-hidden="true" />
                    {selectedEvent.place}
                  </p>
                </div>

                <button type="button" className={styles.event__button}>
                  Зарегистрироваться
                  <img src="/arrow.svg" alt="" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className={styles.event__empty}>
                <p className={styles.event__emptyTitle}>
                  Нет вебинаров в этот день
                </p>
                <p className={styles.event__emptyText}>
                  Посмотрите другие даты или выберите ближайшее мероприятие
                </p>
                <button
                  type="button"
                  className={styles.event__emptyButton}
                  onClick={handleNearestClick}
                >
                  Ближайшие вебинары
                  <img src="/arrow.svg" alt="" aria-hidden="true" />
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

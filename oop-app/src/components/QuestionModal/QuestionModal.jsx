import styles from "./QuestionModal.module.css";

export default function QuestionModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          ×
        </button>

        <p className={styles.title}>Есть вопрос или предложение?</p>
        <p className={styles.subtitle}>Напишите нам — будем рады помочь</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} type="text" placeholder="Имя" />
          <input className={styles.input} type="email" placeholder="Email" />
          <textarea
            className={styles.textarea}
            placeholder="Опишите ваш вопрос или предложение"
          />
          <button type="submit" className={styles.submitButton}>
            Задать вопрос ↗
          </button>
        </form>
      </div>
    </div>
  );
}

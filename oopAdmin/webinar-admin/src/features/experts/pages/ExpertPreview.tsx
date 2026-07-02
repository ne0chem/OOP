import React from "react";
import { X } from "lucide-react";
import "./ExpertPreview.css";

interface ExpertPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    photo: string;
    organization: string;
    position: string;
    specialization: string;
  };
}

const API_BASE_URL = "https://oop-backend-1.onrender.com";

const getFullPhotoUrl = (photoUrl: string) => {
  if (!photoUrl) return "";
  if (photoUrl.startsWith("/uploads")) {
    return `${API_BASE_URL}${photoUrl}`;
  }
  return photoUrl;
};

export const ExpertPreview: React.FC<ExpertPreviewProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  const fullPhotoUrl = getFullPhotoUrl(data.photo);

  const previewExpert = {
    id: "preview",
    name: data.name || "Имя эксперта",
    photo:
      fullPhotoUrl || "https://via.placeholder.com/450x408?text=Фото+эксперта",
    role: data.position || "Должность",
    description: data.specialization || "Описание специализации",
    organization: data.organization || "Организация",
    buttonText: "Вебинар",
    footerText: data.organization || "Место работы",
  };

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div
        className="preview-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="preview-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="preview-title">Предпросмотр карточки эксперта</h2>

        <div className="expert__card">
          <div className="expert__photo">
            <img src={previewExpert.photo} alt={previewExpert.name} />
            <div className="expert__overlay">
              <p className="expert__name">{previewExpert.name}</p>
              <p className="expert__role">{previewExpert.role}</p>
              <p className="expert__description">{previewExpert.description}</p>
            </div>
          </div>

          <div className="expert__footer">
            <div className="expert__buttons">
              <button className="btn__webinar">
                {previewExpert.buttonText}
              </button>
              <div className="btn__arr">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
            <p className="expert__text">{previewExpert.footerText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Edit, Trash2 } from "lucide-react";
import { Expert } from "../types";
import { useGetExpertsQuery, useDeleteExpertMutation } from "../api/expertsApi";
import { toast } from "sonner";

interface Props {
  onEdit: (expert: Expert) => void;
}

export const ExpertsTable = ({ onEdit }: Props) => {
  const { data: experts, isLoading, error } = useGetExpertsQuery();
  const [deleteExpert] = useDeleteExpertMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Удалить эксперта?")) {
      try {
        await deleteExpert(id).unwrap();
        toast.success("Эксперт удален");
      } catch (error) {
        toast.error("Ошибка при удалении");
      }
    }
  };

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="text-red">Ошибка загрузки экспертов</div>;

  const safeExperts = Array.isArray(experts) ? experts : [];

  if (safeExperts.length === 0) {
    return (
      <div
        className="text-center"
        style={{ padding: "2rem", color: "#8e8e93" }}
      >
        Нет экспертов. Нажмите "Добавить эксперта" чтобы создать.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Фото</th>
            <th>Организация</th>
            <th>Должность</th>
            <th>Специализация</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {safeExperts.map((expert) => (
            <tr key={expert.id}>
              <td
                className="text-blue cursor-pointer"
                onClick={() => onEdit(expert)}
              >
                {expert.name}
              </td>
              <td>
                {expert.photo && (
                  <img
                    src={
                      expert.photo.startsWith("/uploads")
                        ? `https://oop-backend-1.onrender.com${expert.photo}`
                        : expert.photo
                    }
                    alt={expert.name}
                    className="image-preview-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
              </td>
              <td>{expert.organization || "-"}</td>
              <td>{expert.position || "-"}</td>
              <td>{expert.specialization || "-"}</td>
              <td className="action-buttons">
                <button
                  onClick={() => onEdit(expert)}
                  className="icon-button icon-edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(expert.id)}
                  className="icon-button icon-delete"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

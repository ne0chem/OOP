import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Webinar } from "../types";
import {
  useGetWebinarsQuery,
  useDeleteWebinarMutation,
} from "../api/webinarsApi";
import { toast } from "sonner";

interface Props {
  onEdit: (webinar: Webinar) => void;
}

export const WebinarTable = ({ onEdit }: Props) => {
  const { data: webinars, isLoading, error } = useGetWebinarsQuery();
  const [deleteWebinar] = useDeleteWebinarMutation();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = ["all", "Маркетинг", "Гос управление", "Коммуникации"];

  const safeWebinars = Array.isArray(webinars) ? webinars : [];

  const filteredWebinars =
    categoryFilter === "all"
      ? safeWebinars
      : safeWebinars.filter((w) => w.category === categoryFilter);

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить вебинар?")) {
      try {
        await deleteWebinar(id).unwrap();
        toast.success("Вебинар удален");
      } catch {
        toast.error("Ошибка при удалении");
      }
    }
  };

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="text-red">Ошибка загрузки</div>;

  return (
    <div>
      <div className="filters">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="input"
          style={{ width: "auto" }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Все категории" : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Дата/Время</th>
              <th>Рубрика</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredWebinars.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Нет вебинаров. Нажмите «Добавить вебинар», чтобы создать.
                </td>
              </tr>
            ) : (
              filteredWebinars.map((webinar) => (
                <tr key={webinar.id}>
                  <td>
                    <button
                      onClick={() => onEdit(webinar)}
                      className="text-blue cursor-pointer"
                    >
                      {webinar.title}
                    </button>
                  </td>
                  <td>
                    {webinar.date} {webinar.time}
                  </td>
                  <td>{webinar.category || "—"}</td>
                  <td>{webinar.is_published ? "Опубликован" : "Черновик"}</td>
                  <td className="action-buttons">
                    <button
                      onClick={() => onEdit(webinar)}
                      className="icon-button icon-edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(webinar.id)}
                      className="icon-button icon-delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

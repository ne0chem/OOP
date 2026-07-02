import { Edit, Trash2 } from "lucide-react";
import { Social } from "../types";
import { useGetSocialsQuery, useDeleteSocialMutation } from "../api/socialsApi";
import { toast } from "sonner";

const API_BASE_URL = "https://oop-backend-1.onrender.com";

interface Props {
  onEdit: (social: Social) => void;
}

const getFullIconUrl = (iconUrl: string | null) => {
  if (!iconUrl) return "";
  if (iconUrl.startsWith("/uploads")) {
    return `${API_BASE_URL}${iconUrl}`;
  }
  return iconUrl;
};

export const SocialsTable = ({ onEdit }: Props) => {
  const { data: socials, isLoading, error } = useGetSocialsQuery();
  const [deleteSocial] = useDeleteSocialMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Удалить соцсеть?")) {
      try {
        await deleteSocial(id).unwrap();
        toast.success("Соцсеть удалена");
      } catch {
        toast.error("Ошибка при удалении");
      }
    }
  };

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="text-red">Ошибка загрузки соцсетей</div>;

  const safeSocials = Array.isArray(socials) ? socials : [];

  if (safeSocials.length === 0) {
    return (
      <div
        className="text-center"
        style={{ padding: "2rem", color: "#8e8e93" }}
      >
        Нет соцсетей. Нажмите «Добавить соцсеть», чтобы создать.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Иконка</th>
            <th>Название</th>
            <th>Ссылка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {safeSocials.map((social) => (
            <tr key={social.id}>
              <td>
                {social.icon ? (
                  <img
                    src={getFullIconUrl(social.icon)}
                    alt={social.name}
                    style={{ width: "32px", height: "32px", objectFit: "contain" }}
                  />
                ) : (
                  "—"
                )}
              </td>
              <td
                className="text-blue cursor-pointer"
                onClick={() => onEdit(social)}
              >
                {social.name}
              </td>
              <td>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue"
                  style={{ fontSize: "0.875rem" }}
                >
                  {social.url}
                </a>
              </td>
              <td className="action-buttons">
                <button
                  onClick={() => onEdit(social)}
                  className="icon-button icon-edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(social.id)}
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

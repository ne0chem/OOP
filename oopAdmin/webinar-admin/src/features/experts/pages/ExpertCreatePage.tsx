import { useNavigate } from "react-router-dom";
import { ExpertForm } from "../components/ExpertForm";
import { useCreateExpertMutation } from "../api/expertsApi";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export const ExpertCreatePage = () => {
  const navigate = useNavigate();
  const [createExpert, { isLoading }] = useCreateExpertMutation();

  const handleSubmit = async (data: any) => {
    try {
      await createExpert(data).unwrap();
      toast.success("Эксперт успешно создан");
      navigate("/experts");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Ошибка при создании эксперта");
    }
  };

  return (
    <div>
      <div className="page-header">
        <button
          onClick={() => navigate("/experts")}
          className="btn btn-secondary"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <ArrowLeft size={18} />
          Назад
        </button>
        <h1 className="page-title">Создание эксперта</h1>
      </div>

      <ExpertForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/experts")}
        isLoading={isLoading}
      />
    </div>
  );
};

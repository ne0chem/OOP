import { useState } from "react";
import { Plus } from "lucide-react";
import { SocialsTable } from "../components/SocialsTable";
import { SocialForm } from "../components/SocialForm";
import { Social, SocialFormData } from "../types";
import {
  useCreateSocialMutation,
  useUpdateSocialMutation,
} from "../api/socialsApi";
import { toast } from "sonner";

export const SocialsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingSocial, setEditingSocial] = useState<Social | null>(null);
  const [createSocial, { isLoading: isCreating }] = useCreateSocialMutation();
  const [updateSocial, { isLoading: isUpdating }] = useUpdateSocialMutation();

  const handleSubmit = async (data: SocialFormData) => {
    try {
      if (editingSocial) {
        await updateSocial({ id: editingSocial.id, data }).unwrap();
        toast.success("Соцсеть обновлена");
      } else {
        await createSocial(data).unwrap();
        toast.success("Соцсеть создана");
      }
      setShowForm(false);
      setEditingSocial(null);
    } catch (error: unknown) {
      const message =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? String(error.data.message)
          : "Ошибка при сохранении";
      toast.error(message);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Управление соцсетями</h1>
        {!showForm && (
          <button
            onClick={() => {
              setEditingSocial(null);
              setShowForm(true);
            }}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Добавить соцсеть
          </button>
        )}
      </div>

      {showForm ? (
        <SocialForm
          initialData={editingSocial || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingSocial(null);
          }}
          isLoading={isCreating || isUpdating}
        />
      ) : (
        <SocialsTable
          onEdit={(social) => {
            setEditingSocial(social);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
};

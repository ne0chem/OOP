import { useState } from "react";
import { Plus } from "lucide-react";
import { WebinarTable } from "../components/WebinarTable";
import { WebinarForm } from "../components/WebinarForm";
import { Webinar, WebinarFormData } from "../types";
import {
  useCreateWebinarMutation,
  useUpdateWebinarMutation,
} from "../api/webinarsApi";
import { toast } from "sonner";

export const WebinarsListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingWebinar, setEditingWebinar] = useState<Webinar | null>(null);
  const [createWebinar, { isLoading: isCreating }] = useCreateWebinarMutation();
  const [updateWebinar, { isLoading: isUpdating }] = useUpdateWebinarMutation();

  const handleSubmit = async (data: WebinarFormData) => {
    try {
      if (editingWebinar) {
        await updateWebinar({ id: editingWebinar.id, data }).unwrap();
        toast.success("Вебинар обновлен");
      } else {
        await createWebinar(data).unwrap();
        toast.success("Вебинар создан");
      }
      setShowForm(false);
      setEditingWebinar(null);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Ошибка при сохранении");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Управление вебинарами</h1>
        <button
          onClick={() => {
            setEditingWebinar(null);
            setShowForm(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Добавить вебинар
        </button>
      </div>

      {showForm ? (
        <WebinarForm
          initialData={editingWebinar || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingWebinar(null);
          }}
          isLoading={isCreating || isUpdating}
        />
      ) : (
        <WebinarTable
          onEdit={(webinar) => {
            setEditingWebinar(webinar);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
};

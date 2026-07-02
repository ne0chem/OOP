import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Expert, ExpertFormData } from "../types";
import { useUploadPhotoMutation } from "../api/expertsApi";
import { toast } from "sonner";
import { Upload, Eye } from "lucide-react";
import { ALLOWED_IMAGE_ACCEPT, ALLOWED_IMAGE_ERROR, ALLOWED_IMAGE_HINT, isAllowedImageFile } from "../../../shared/imageUpload";
import { ExpertPreview } from "../pages/ExpertPreview";

const API_BASE_URL = "https://oop-backend-1.onrender.com";

const expertSchema = z.object({
  name: z.string().min(3, "ФИО минимум 3 символа"),
  photo: z.string().optional(),
  organization: z.string().optional(),
  position: z.string().optional(),
  specialization: z.string().optional(),
});

interface Props {
  initialData?: Expert;
  onSubmit: (data: ExpertFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const getFullPhotoUrl = (photoUrl: string) => {
  if (!photoUrl) return "";
  if (photoUrl.startsWith("/uploads")) {
    return `${API_BASE_URL}${photoUrl}`;
  }
  return photoUrl;
};

export const ExpertForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: Props) => {
  const [uploadPhoto, { isLoading: isUploading }] = useUploadPhotoMutation();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<ExpertFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm<ExpertFormData>({
    resolver: zodResolver(expertSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          photo: initialData.photo || "",
          organization: initialData.organization || "",
          position: initialData.position || "",
          specialization: initialData.specialization || "",
        }
      : {
          name: "",
          photo: "",
          organization: "",
          position: "",
          specialization: "",
        },
  });

  const photoValue = watch("photo");
  const formValues = watch();

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        photo: initialData.photo || "",
        organization: initialData.organization || "",
        position: initialData.position || "",
        specialization: initialData.specialization || "",
      });
    }
  }, [initialData, reset]);

  const handlePreview = () => {
    setPreviewData(getValues());
    setIsPreviewOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isAllowedImageFile(file)) {
      toast.error(ALLOWED_IMAGE_ERROR);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Файл не должен превышать 5MB");
      return;
    }

    try {
      const result = await uploadPhoto(file).unwrap();
      setValue("photo", result.url);
      toast.success("Фото загружено");
    } catch {
      toast.error("Ошибка при загрузке фото");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={handlePreview}
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Eye size={18} />
            Предпросмотр
          </button>
        </div>

        <div className="form-group">
          <label className="label">ФИО *</label>
          <input {...register("name")} className="input" />
          {errors.name && (
            <p className="text-red mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="label">Фото</label>
          <div className="flex items-center gap-4">
            <label
              className="btn btn-secondary"
              style={{ cursor: "pointer", position: "relative" }}
            >
              <Upload size={16} />
              {isUploading ? "Загрузка..." : "Выбрать файл"}
              <input
                type="file"
                accept={ALLOWED_IMAGE_ACCEPT}
                onChange={handleFileChange}
                style={{ position: "absolute", opacity: 0, cursor: "pointer" }}
                disabled={isUploading}
              />
            </label>
            {photoValue && (
              <img
                src={getFullPhotoUrl(photoValue)}
                alt="preview"
                className="image-preview-circle"
              />
            )}
          </div>
          <input type="hidden" {...register("photo")} />
          <p
            className="text-muted mt-1"
            style={{ fontSize: "0.75rem", color: "#8e8e93" }}
          >
            {ALLOWED_IMAGE_HINT}
          </p>
        </div>

        <div className="form-group">
          <label className="label">Организация</label>
          <input {...register("organization")} className="input" />
        </div>

        <div className="form-group">
          <label className="label">Должность</label>
          <input {...register("position")} className="input" />
        </div>

        <div className="form-group">
          <label className="label">Специализация</label>
          <input {...register("specialization")} className="input" />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting || isUploading || isLoading}
            className="btn btn-primary"
          >
            {isSubmitting || isLoading
              ? "Сохранение..."
              : initialData
                ? "Обновить"
                : "Создать"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Отмена
          </button>
        </div>
      </form>

      <ExpertPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={
          previewData || {
            name: formValues.name || "Имя эксперта",
            photo: formValues.photo || "",
            organization: formValues.organization || "",
            position: formValues.position || "",
            specialization: formValues.specialization || "",
          }
        }
      />
    </>
  );
};

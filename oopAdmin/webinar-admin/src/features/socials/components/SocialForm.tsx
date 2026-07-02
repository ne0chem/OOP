import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Social, SocialFormData } from "../types";
import { useUploadPhotoMutation } from "../../experts/api/expertsApi";
import { toast } from "sonner";
import { Upload, Eye } from "lucide-react";
import {
  ALLOWED_IMAGE_ACCEPT,
  ALLOWED_IMAGE_ERROR,
  ALLOWED_IMAGE_HINT,
  isAllowedImageFile,
} from "../../../shared/imageUpload";
import { SocialPreview } from "./SocialPreview";

const API_BASE_URL = "https://oop-backend-1.onrender.com";

const socialSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  url: z.string().url("Введите корректную ссылку"),
  icon: z.string().optional(),
});

interface Props {
  initialData?: Social;
  onSubmit: (data: SocialFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const getFullIconUrl = (iconUrl: string) => {
  if (!iconUrl) return "";
  if (iconUrl.startsWith("/uploads")) {
    return `${API_BASE_URL}${iconUrl}`;
  }
  return iconUrl;
};

export const SocialForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: Props) => {
  const [uploadIcon, { isLoading: isUploading }] = useUploadPhotoMutation();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<SocialFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm<SocialFormData>({
    resolver: zodResolver(socialSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          url: initialData.url,
          icon: initialData.icon || "",
        }
      : {
          name: "",
          url: "",
          icon: "",
        },
  });

  const iconValue = watch("icon");
  const formValues = watch();

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        url: initialData.url,
        icon: initialData.icon || "",
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
      const result = await uploadIcon(file).unwrap();
      setValue("icon", result.url);
      toast.success("Иконка загружена");
    } catch {
      toast.error("Ошибка при загрузке иконки");
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
          <label className="label">Название *</label>
          <input
            {...register("name")}
            className="input"
            placeholder="VK, Rutube..."
          />
          {errors.name && (
            <p className="text-red mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="label">Ссылка *</label>
          <input
            {...register("url")}
            className="input"
            placeholder="https://..."
          />
          {errors.url && <p className="text-red mt-1">{errors.url.message}</p>}
        </div>

        <div className="form-group">
          <label className="label">Иконка</label>
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
            {iconValue && (
              <img
                src={getFullIconUrl(iconValue)}
                alt="иконка"
                style={{ width: "32px", height: "32px", objectFit: "contain" }}
              />
            )}
          </div>
          <input type="hidden" {...register("icon")} />
          <p
            className="text-muted mt-1"
            style={{ fontSize: "0.75rem", color: "#8e8e93" }}
          >
            {ALLOWED_IMAGE_HINT}
          </p>
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
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Отмена
          </button>
        </div>
      </form>

      <SocialPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={
          previewData || {
            name: formValues.name || "",
            url: formValues.url || "",
            icon: formValues.icon || "",
          }
        }
      />
    </>
  );
};

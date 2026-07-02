import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { ALLOWED_IMAGE_ACCEPT, ALLOWED_IMAGE_ERROR, isAllowedImageFile } from "../../../shared/imageUpload";
import { Webinar, WebinarFormData } from "../types";
import { useUploadPhotoMutation } from "../../experts/api/expertsApi";

const API_BASE_URL = "https://oop-backend-1.onrender.com";

const webinarSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  date: z.string().min(1, "Дата обязательна"),
  time: z.string().min(1, "Время обязательно"),
  category: z.string().optional(),
  stream_url: z
    .string()
    .refine(
      (val) => !val || /^https?:\/\/.+/.test(val),
      "Введите корректную ссылку",
    )
    .optional(),
  photo: z.string().optional(),
  preview: z.string().optional(),
  is_published: z.boolean(),
});

interface Props {
  initialData?: Webinar;
  onSubmit: (data: WebinarFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const getFullImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("/uploads")) {
    return `${API_BASE_URL}${url}`;
  }
  return url;
};

const toFormData = (webinar?: Webinar): WebinarFormData => ({
  title: webinar?.title ?? "",
  description: webinar?.description ?? "",
  date: webinar?.date ?? "",
  time: webinar?.time ?? "",
  category: webinar?.category ?? "",
  stream_url: webinar?.stream_url ?? "",
  photo: webinar?.photo ?? "",
  preview: webinar?.preview ?? "",
  is_published: webinar?.is_published ?? false,
});

export const WebinarForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: Props) => {
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();
  const [uploadPreview, { isLoading: isUploadingPreview }] =
    useUploadPhotoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<WebinarFormData>({
    resolver: zodResolver(webinarSchema),
    defaultValues: toFormData(initialData),
  });

  const photoValue = watch("photo");
  const previewValue = watch("preview");

  useEffect(() => {
    if (initialData) {
      reset(toFormData(initialData));
    }
  }, [initialData, reset]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "photo" | "preview",
  ) => {
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

    const upload = field === "photo" ? uploadPhoto : uploadPreview;

    try {
      const result = await upload(file).unwrap();
      setValue(field, result.url);
      toast.success(
        field === "photo" ? "Фото загружено" : "Превью загружено",
      );
    } catch {
      toast.error("Ошибка при загрузке изображения");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <div className="form-group">
        <label className="label">Название *</label>
        <input {...register("title")} className="input" />
        {errors.title && (
          <p className="text-red mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="label">Описание *</label>
        <textarea
          {...register("description")}
          className="input"
          rows={4}
          style={{ resize: "vertical" }}
        />
        {errors.description && (
          <p className="text-red mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="label">Дата *</label>
          <input type="date" {...register("date")} className="input" />
          {errors.date && (
            <p className="text-red mt-1">{errors.date.message}</p>
          )}
        </div>
        <div className="form-group">
          <label className="label">Время *</label>
          <input type="time" {...register("time")} className="input" />
          {errors.time && (
            <p className="text-red mt-1">{errors.time.message}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="label">Рубрика</label>
        <select {...register("category")} className="input">
          <option value="">Не выбрана</option>
          <option value="Маркетинг">Маркетинг</option>
          <option value="Гос управление">Гос управление</option>
          <option value="Коммуникации">Коммуникации</option>
        </select>
      </div>

      <div className="form-group">
        <label className="label">Ссылка на трансляцию (Rutube)</label>
        <input
          {...register("stream_url")}
          placeholder="https://rutube.ru/..."
          className="input"
        />
        {errors.stream_url && (
          <p className="text-red mt-1">{errors.stream_url.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="label">Фото для главной</label>
        <div className="flex items-center gap-4">
          <label
            className="btn btn-secondary"
            style={{ cursor: "pointer", position: "relative" }}
          >
            <Upload size={16} />
            {isUploadingPhoto ? "Загрузка..." : "Выбрать файл"}
            <input
              type="file"
              accept={ALLOWED_IMAGE_ACCEPT}
              onChange={(e) => handleImageUpload(e, "photo")}
              style={{ position: "absolute", opacity: 0, cursor: "pointer" }}
              disabled={isUploadingPhoto}
            />
          </label>
          {photoValue && (
            <img
              src={getFullImageUrl(photoValue)}
              alt="главное"
              className="image-preview"
            />
          )}
        </div>
        <input type="hidden" {...register("photo")} />
      </div>

      <div className="form-group">
        <label className="label">Превью для списка</label>
        <div className="flex items-center gap-4">
          <label
            className="btn btn-secondary"
            style={{ cursor: "pointer", position: "relative" }}
          >
            <Upload size={16} />
            {isUploadingPreview ? "Загрузка..." : "Выбрать файл"}
            <input
              type="file"
              accept={ALLOWED_IMAGE_ACCEPT}
              onChange={(e) => handleImageUpload(e, "preview")}
              style={{ position: "absolute", opacity: 0, cursor: "pointer" }}
              disabled={isUploadingPreview}
            />
          </label>
          {previewValue && (
            <img
              src={getFullImageUrl(previewValue)}
              alt="preview"
              className="image-preview"
            />
          )}
        </div>
        <input type="hidden" {...register("preview")} />
      </div>

      <div className="form-group">
        <label className="label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="checkbox" {...register("is_published")} />
          Опубликован
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={
            isSubmitting || isLoading || isUploadingPhoto || isUploadingPreview
          }
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
  );
};

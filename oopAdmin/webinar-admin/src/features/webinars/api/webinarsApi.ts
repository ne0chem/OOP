import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Webinar,
  WebinarApi,
  WebinarFormData,
} from "../types";

const API_BASE_URL = "https://oop-backend-1.onrender.com";

const getToken = () => localStorage.getItem("token");

const parseListResponse = <T>(response: unknown): T[] => {
  if (response && typeof response === "object" && "items" in response) {
    const items = (response as { items: unknown }).items;
    if (Array.isArray(items)) {
      return items as T[];
    }
  }
  if (Array.isArray(response)) {
    return response as T[];
  }
  return [];
};

const parseStartTime = (startTime: string): { date: string; time: string } => {
  if (!startTime) return { date: "", time: "" };

  const normalized = startTime.includes("T")
    ? startTime
    : startTime.replace(" ", "T");
  const [datePart, timePart = ""] = normalized.split("T");

  return {
    date: datePart.slice(0, 10),
    time: timePart.slice(0, 5),
  };
};

const mapApiToWebinar = (api: WebinarApi): Webinar => {
  const { date, time } = parseStartTime(api.start_time);

  return {
    id: String(api.id),
    title: api.title ?? "",
    description: api.description ?? "",
    date,
    time,
    category: api.category ?? "",
    stream_url: api.stream_url ?? "",
    photo: api.photo ?? "",
    preview: api.preview ?? "",
    is_published: Boolean(api.is_published),
  };
};

const buildStartTime = (date: string, time: string): string =>
  `${date}T${time.length === 5 ? `${time}:00` : time}`;

const buildWebinarBody = (
  data: WebinarFormData,
  requireAll = false,
): Record<string, unknown> => {
  const body: Record<string, unknown> = {};

  if (requireAll || data.title?.trim()) body.title = data.title.trim();
  if (requireAll || data.description?.trim()) {
    body.description = data.description.trim();
  }
  if (data.date?.trim() && data.time?.trim()) {
    body.start_time = buildStartTime(data.date.trim(), data.time.trim());
  }
  if (data.category?.trim()) body.category = data.category.trim();
  if (data.stream_url?.trim()) body.stream_url = data.stream_url.trim();
  if (data.photo?.trim()) body.photo = data.photo.trim();
  if (data.preview?.trim()) body.preview = data.preview.trim();
  body.is_published = data.is_published;

  return body;
};

export const webinarsApi = createApi({
  reducerPath: "webinarsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Webinar"],
  endpoints: (builder) => ({
    getWebinars: builder.query<Webinar[], void>({
      query: () => "/admin/webinar/all",
      transformResponse: (response: unknown) =>
        parseListResponse<WebinarApi>(response).map(mapApiToWebinar),
      providesTags: ["Webinar"],
    }),
    getWebinarById: builder.query<Webinar, string>({
      query: (id) => `/admin/webinar/${id}`,
      transformResponse: (response: WebinarApi) => mapApiToWebinar(response),
    }),
    createWebinar: builder.mutation<Webinar, WebinarFormData>({
      query: (data) => ({
        url: "/admin/create/webinar",
        method: "POST",
        body: buildWebinarBody(data, true),
      }),
      transformResponse: (response: WebinarApi) => mapApiToWebinar(response),
      invalidatesTags: ["Webinar"],
    }),
    updateWebinar: builder.mutation<
      Webinar,
      { id: string; data: WebinarFormData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/webinar/update/${id}`,
        method: "PATCH",
        body: buildWebinarBody(data),
      }),
      transformResponse: (response: WebinarApi) => mapApiToWebinar(response),
      invalidatesTags: ["Webinar"],
    }),
    deleteWebinar: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/webinar/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Webinar"],
    }),
  }),
});

export const {
  useGetWebinarsQuery,
  useGetWebinarByIdQuery,
  useCreateWebinarMutation,
  useUpdateWebinarMutation,
  useDeleteWebinarMutation,
} = webinarsApi;

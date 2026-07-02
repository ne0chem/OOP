import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Expert, ExpertFormData } from "../types";

const API_BASE_URL = "https://oop-backend-1.onrender.com";

const getToken = () => localStorage.getItem("token");

interface UploadPhotoResponse {
  url: string;
}

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

const buildExpertBody = (data: ExpertFormData): Record<string, string> => {
  const body: Record<string, string> = {};

  if (data.name?.trim()) body.name = data.name.trim();
  if (data.photo?.trim()) body.photo = data.photo.trim();
  if (data.organization?.trim()) body.organization = data.organization.trim();
  if (data.position?.trim()) body.position = data.position.trim();
  if (data.specialization?.trim()) body.specialization = data.specialization.trim();

  return body;
};

export const expertsApi = createApi({
  reducerPath: "expertsApi",
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
  tagTypes: ["Expert"],
  endpoints: (builder) => ({
    getExperts: builder.query<Expert[], void>({
      query: () => "/admin/expert/all",
      transformResponse: (response: unknown) =>
        parseListResponse<Expert>(response).map((expert) => ({
          ...expert,
          id: String(expert.id),
        })),
      providesTags: ["Expert"],
    }),
    getExpertById: builder.query<Expert, string>({
      query: (id) => `/admin/expert/${id}`,
      transformResponse: (response: Expert) => ({
        ...response,
        id: String(response.id),
      }),
    }),
    uploadPhoto: builder.mutation<UploadPhotoResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/admin/images/upload",
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: unknown) => {
        if (typeof response === "string") {
          return { url: response };
        }
        if (response && typeof response === "object") {
          const data = response as Record<string, string>;
          if (data.url) return { url: data.url };
          if (data.file_url) return { url: data.file_url };
        }
        return { url: "" };
      },
    }),
    createExpert: builder.mutation<Expert, ExpertFormData>({
      query: (data) => ({
        url: "/admin/create/expert",
        method: "POST",
        body: buildExpertBody(data),
      }),
      invalidatesTags: ["Expert"],
    }),
    updateExpert: builder.mutation<
      Expert,
      { id: string; data: ExpertFormData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/expert/update/${id}`,
        method: "PATCH",
        body: buildExpertBody(data),
      }),
      invalidatesTags: ["Expert"],
    }),
    deleteExpert: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/expert/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expert"],
    }),
  }),
});

export const {
  useGetExpertsQuery,
  useGetExpertByIdQuery,
  useUploadPhotoMutation,
  useCreateExpertMutation,
  useUpdateExpertMutation,
  useDeleteExpertMutation,
} = expertsApi;

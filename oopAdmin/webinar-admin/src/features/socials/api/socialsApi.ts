import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Social, SocialFormData } from "../types";

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

const buildSocialBody = (
  data: SocialFormData,
  requireAll = false,
): Record<string, string> => {
  const body: Record<string, string> = {};

  if (requireAll || data.name?.trim()) body.name = data.name.trim();
  if (requireAll || data.url?.trim()) body.url = data.url.trim();
  if (data.icon?.trim()) body.icon = data.icon.trim();

  return body;
};

export const socialsApi = createApi({
  reducerPath: "socialsApi",
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
  tagTypes: ["Social"],
  endpoints: (builder) => ({
    getSocials: builder.query<Social[], void>({
      query: () => "/public/social",
      transformResponse: (response: unknown) =>
        parseListResponse<Social>(response).map((social) => ({
          ...social,
          id: String(social.id),
        })),
      providesTags: ["Social"],
    }),
    getSocialById: builder.query<Social, string>({
      query: (id) => `/social/${id}`,
      transformResponse: (response: Social) => ({
        ...response,
        id: String(response.id),
      }),
    }),
    createSocial: builder.mutation<Social, SocialFormData>({
      query: (data) => ({
        url: "/admin/create/social",
        method: "POST",
        body: buildSocialBody(data, true),
      }),
      invalidatesTags: ["Social"],
    }),
    updateSocial: builder.mutation<
      Social,
      { id: string; data: SocialFormData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/social/update/${id}`,
        method: "PATCH",
        body: buildSocialBody(data),
      }),
      invalidatesTags: ["Social"],
    }),
    deleteSocial: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/social/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Social"],
    }),
  }),
});

export const {
  useGetSocialsQuery,
  useGetSocialByIdQuery,
  useCreateSocialMutation,
  useUpdateSocialMutation,
  useDeleteSocialMutation,
} = socialsApi;

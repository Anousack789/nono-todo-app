import { apiSlice } from "../apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "user/profile",
      }),
    }),
    updateProfile: builder.mutation({
      query: (dto) => ({
        url: "user/profile",
        method: "POST",
        body: dto,
      }),
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation } = userApi;

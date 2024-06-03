import { apiSlice } from "../apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: (dto) => ({
        url: "auth/login",
        body: dto,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

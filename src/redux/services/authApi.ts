import { ILogin, IRegister } from "../../interfaces/i-auth";
import { apiSlice } from "../apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, ILogin>({
      query: (dto) => ({
        url: "auth/login",
        body: dto,
        method: "POST",
      }),
    }),

    register: builder.mutation<any, IRegister>({
      query: (dto) => ({
        url: "auth/register",
        body: dto,
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;

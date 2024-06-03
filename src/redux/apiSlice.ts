import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AppConfig from "../AppConfig";

export const apiSlice = createApi({
  baseQuery: async (args: any, api: any, extraOptions: any) => {
    const _baseQuery = fetchBaseQuery({
      baseUrl: AppConfig.API,
      credentials: "include",
    });

    let result = await _baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
      const refreshResult = await _baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
        },
        {
          ...api,
          endpoint: "refresh",
        },
        extraOptions
      );
      if ((refreshResult.data as any)?.status === "success") {
        result = await _baseQuery(args, api, extraOptions);
      } else {
        window.location.href = "#/login";
      }
    }

    return result;
  },
  endpoints: () => ({}),
});

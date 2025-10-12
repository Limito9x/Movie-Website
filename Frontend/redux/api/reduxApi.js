import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// Tạo một custom baseQuery dùng axios
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

// Khởi tạo reduxApi với RTK Query
export const createReduxApi = (apiName, customEndpoints = {}) => {
  const reduxApi = createApi({
    reducerPath: `reduxApi/${apiName}`,
    baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:3000" }), // Đổi baseUrl theo backend của bạn
    tagTypes: [apiName],
    endpoints: (builder) => ({
      get: builder.query({
        query: (params) => ({
          url: `/${apiName}`,
          method: "GET",
          params,
        }),
        providesTags: [apiName],
      }),
      getById: builder.query({
        query: (id) => ({
          url: `/${apiName}/${id}`,
          method: "GET",
        }),
      }),
      create: builder.mutation({
        query: (data) => ({
          url: `/${apiName}`,
          method: "POST",
          data,
        }),
        invalidatesTags: [apiName],
      }),
      update: builder.mutation({
        query: ({ id, data }) => ({
          url: `/${apiName}/${id}`,
          method: "PATCH",
          data,
        }),
        invalidatesTags: [apiName],
      }),
      delete: builder.mutation({
        query: (id) => ({
          url: `/${apiName}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [apiName],
      }),
      ...(typeof customEndpoints === "function"
        ? customEndpoints(builder)
        : {}),
    }),
  });
  return reduxApi;
};

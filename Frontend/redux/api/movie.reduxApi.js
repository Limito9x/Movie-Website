import { createReduxApi } from "./reduxApi";
import { createFormData } from "@/utils/formUtils";

const customMovieEndpoints = (builder) => ({
    create: builder.mutation({
        query: (data) => ({
            url: `/movies`,
            method: "POST",
            data: createFormData(data),
        }),
        invalidatesTags: ["movies"],
    }),
    update: builder.mutation({
        query: ({ id, data }) => ({
            url: `/movies/${id}`,
            method: "PATCH",
            data: createFormData(data),
        }),
        invalidatesTags: ["movies"],
    }),
});

export const movieReduxApi = createReduxApi("movies", customMovieEndpoints);
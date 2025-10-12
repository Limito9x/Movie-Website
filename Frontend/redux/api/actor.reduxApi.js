import { createReduxApi } from "./reduxApi";
import { createFormData } from "@/utils/formUtils";

const customActorEndpoints = (builder) => ({
    create: builder.mutation({
        query: (data) => ({
            url: `/actors`,
            method: "POST",
            data: createFormData(data),
        }),
        invalidatesTags: ["actors"],
    }),
    update: builder.mutation({
        query: ({ id, data }) => ({
            url: `/actors/${id}`,
            method: "PUT",
            data: createFormData(data),
        }),
        invalidatesTags: ["actors"],
    }),
});

export const actorReduxApi = createReduxApi("actors", customActorEndpoints);
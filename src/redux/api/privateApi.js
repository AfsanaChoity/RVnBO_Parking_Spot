import { baseApi } from "./baseApi";

const privateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // View Spot Details
        getSpotDetails: builder.query({
            query: (spotId) => ({
                url: `lands/land-details/${spotId}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Spot", id }],
        }),




    })
})

export const {

    useGetSpotDetailsQuery,
    useGetMessagesQuery,
    useSendMessageMutation,


} = privateApi;

export default privateApi;
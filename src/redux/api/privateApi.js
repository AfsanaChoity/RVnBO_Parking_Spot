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

        // get All chat users
        getAllChatUsers: builder.query({
            query: () => ({
                url: "message/users",
                method: "GET",
            }),
            providesTags: ["ChatUsers"],
        }),


    })
})

export const {

    useGetSpotDetailsQuery,
    useGetAllChatUsersQuery,

} = privateApi;

export default privateApi;
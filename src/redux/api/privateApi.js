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

        // get chat messages by user id
        getChatMessagesByUserId: builder.query({
            query: (userId) => ({
                url: `message/${userId}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Messages", id }],
        }),


    })
})

export const {

    useGetSpotDetailsQuery,
    useGetAllChatUsersQuery,
    useGetChatMessagesByUserIdQuery,

} = privateApi;

export default privateApi;
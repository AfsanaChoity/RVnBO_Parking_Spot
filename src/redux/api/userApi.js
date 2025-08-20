import { baseApi } from "./baseApi";

const landownerApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        // get all spots
         getAllSpots: builder.query({
            query: () => ({
                url: 'traveler/all-lands',
                method: 'GET',
                
            }),
        }),

        // contact with admin
         contactAdmin: builder.mutation({
            query: (data) => ({
                url: 'contact',
                method: 'POST',
                body: data,
            }),
        }),

        

    })
})

export const { 
    useGetAllSpotsQuery, 
    useContactAdminMutation,
 } = landownerApi;
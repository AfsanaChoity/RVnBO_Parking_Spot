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

        

    })
})

export const { useGetAllSpotsQuery } = landownerApi;
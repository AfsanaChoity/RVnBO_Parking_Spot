import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // get all spots
        getAllSpots: builder.query({
            query: () => ({
                url: 'global/all-lands',
                method: 'GET',

            }),
        }),

        //search spot
        searchSpots: builder.query({
            
            query: (args = {}) => {
                const params = new URLSearchParams();

                // basic
                if (args.location) params.append("location", args.location);
                if (args.minPrice != null) params.append("minPrice", args.minPrice);
                if (args.maxPrice != null) params.append("maxPrice", args.maxPrice);
                if (args.minRating != null) params.append("minRating", args.minRating);

                // arrays -> comma separated
                if (args.site_types?.length) params.append("site_types", args.site_types.join(","));
                if (args.rv_type?.length) params.append("rv_type", args.rv_type.join(","));
                if (args.amenities?.length) params.append("amenities", args.amenities.join(","));

                // others
                if (args.site_length) params.append("site_length", args.site_length);
                if (args.max_slide != null) params.append("max_slide", args.max_slide);

                return `/lands/search-filter?${params.toString()}`;
            },
        }),

        // search spots by location
        // searchSpotByLocation: builder.query({
        //     query: (location) => ({
        //         url: `global/search?location=${encodeURIComponent(location)}`,
        //         method: 'GET',
        //     }),
        // }),


        // filterSpots: builder.query({
        //     query: (filters) => {
        //         const params = new URLSearchParams();

        //         // Append filters only if they are defined
        //         if (filters?.minPrice) params.append('minPrice', filters.minPrice);
        //         if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice);
        //         if (filters?.site_types?.length) params.append('site_types', filters.site_types.join(','));
        //         if (filters?.rv_type?.length) params.append('rv_type', filters.rv_type.join(','));
        //         if (filters?.minRating) params.append('minRating', filters.minRating);
        //         if (filters?.amenities?.length) params.append('amenities', filters.amenities.join(','));
        //         if (filters?.site_length) params.append('site_length', filters.site_length);
        //         if (filters?.max_slide) params.append('max_slide', filters.max_slide);

        //         return {
        //             url: `global/filter?${params.toString()}`,
        //             method: 'GET',
        //         };
        //     },
        // }),


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
    // useSearchSpotByLocationQuery,
    useSearchSpotsQuery,
    useFilterSpotsQuery,
    useContactAdminMutation,

} = userApi;
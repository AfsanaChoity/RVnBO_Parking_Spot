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

        // contact with admin
        contactAdmin: builder.mutation({
            query: (data) => ({
                url: 'contact',
                method: 'POST',
                body: data,
            }),
        }),

        // About Us
        getAboutUs: builder.query({
            query: () => ({
                url: "global/about-us",
                method: "GET",
            }),
        }),

        // Privacy Policy
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: "global/privacy-policy",
                method: "GET",
            }),
        }),

        // Terms & Conditions
        getTermsConditions: builder.query({
            query: () => ({
                url: "global/terms-conditions",
                method: "GET",
            }),
        }),


    })
})

export const {
    useGetAllSpotsQuery,
    useSearchSpotsQuery,
    useContactAdminMutation,
    useGetAboutUsQuery,
    useGetPrivacyPolicyQuery,
    useGetTermsConditionsQuery,

} = userApi;
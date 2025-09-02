import { baseApi } from "./baseApi";

const landownerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getOverviewData: builder.query({
      query: () => ({
        url: "dashboard/overview",
        method: "GET",
      }),
      providesTags: ["OverviewData"],
    }),

    getSpotList: builder.query({
      query: () => ({
        url: "landowner/lands",
        method: "GET",
      }),
      providesTags: [{ type: "SpotList", id: "LIST" }],
    }),

    // Create Spot
    createSpot: builder.mutation({
      query: (spotData) => ({
        url: "landowner/addland",
        method: "POST",
        body: spotData,

      }),
      invalidatesTags: [{ type: "SpotList", id: "LIST" }],
    }),

    // Edit Spot
    updateSpot: builder.mutation({
      query: ({ spotId, data }) => ({
        url: `landowner/updateland/${spotId}`,
        method: "PATCH",
        body: data,
      }),
      //  invalidatesTags: [{ type: 'SpotList', id: 'LIST' }],
      invalidatesTags: (result, error, { spotId }) => [
        { type: "SpotList", id: "LIST" },
        { type: "Spot", id: spotId },
      ],
    }),


    // Delete Spot
    deleteSpot: builder.mutation({
      query: (spotId) => ({
        url: `landowner/deleteland/${spotId}`,
        method: "DELETE",
      }),
      // invalidatesTags: [{ type: "SpotList", id: "LIST" }],
      invalidatesTags: (result, error, spotId) => [
        { type: "SpotList", id: "LIST" }, // To refetch the list of spots
        { type: "Spot", id: spotId }, // To refetch the specific spot details
      ],

    }),



    getAllEarning: builder.query({
      query: () => ({
        url: "dashboard/earnings",
        method: "GET",
      }),
      providesTags: ["Earnings"],
    }),

    getAllReviews: builder.query({
      query: () => ({
        url: "dashboard/all-reviews",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    getAllTransaction: builder.query({
      query: () => ({
        url: "dashboard/transactions",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),


    updateHostProfile: builder.mutation({
      query: (body) => ({
        url: "dashboard/update-profile",
        method: "PATCH",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["User"],
    }),


    changeHostPassword: builder.mutation({
      query: ({ currentPassword, newPassword, confirmPassword }) => ({
        url: "dashboard/change-password",
        method: "PUT",
        body: { currentPassword, newPassword, confirmPassword },
        headers: { "Content-Type": "application/json" },
      }),
    }),




  }),
});

export const {
  useGetOverviewDataQuery,
  useGetSpotListQuery,
  useCreateSpotMutation,
  useUpdateSpotMutation,
  useDeleteSpotMutation,
  useGetAllEarningQuery,
  useGetAllReviewsQuery,
  useGetAllTransactionQuery,
  useUpdateHostProfileMutation,
  useChangeHostPasswordMutation,

} = landownerApi;

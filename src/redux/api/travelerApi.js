import { baseApi } from "./baseApi";

const travelerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveSpot: builder.mutation({
      query: (spotId) => ({
        url: `traveler/save/${spotId}`,
        method: "POST",
      }),
      invalidatesTags: ["SavedSpots"],
    }),

    unsaveSpot: builder.mutation({
      query: (spotId) => ({
        url: `traveler/unsave/${spotId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedSpots"],
      async onQueryStarted(spotId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            travelerApi.util.updateQueryData(
              "getAllSavedSpots",
              undefined,
              (draft) => {
                if (draft?.savedLands) {
                  draft.savedLands = draft.savedLands.filter(
                    (spot) => spot._id !== spotId
                  );
                }
              }
            )
          );
        } catch (err) {
          console.error("Failed to unsave spot:", err);
        }
      },
    }),

    getAllSavedSpots: builder.query({
      query: () => ({
        url: "traveler/saved-lands",
        method: "GET",
      }),
      providesTags: ["SavedSpots"],
    }),

    getBookingSpots: builder.query({
      query: () => ({
        url: "dashboard/my-bookings",
        method: "GET",

      }),
      providesTags: ["BookingSpots"],
    }),


    updateTravelerProfile: builder.mutation({
      query: (body) => ({
        url: "dashboard/update-profile",
        method: "PATCH",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["User"],
    }),


    changePassword: builder.mutation({
      query: ({ currentPassword, newPassword, confirmPassword }) => ({
        url: "dashboard/change-password",
        method: "PUT",
        body: { currentPassword, newPassword, confirmPassword },
        headers: { "Content-Type": "application/json" },
      }),
    }),


    // give review
    submitReview: builder.mutation({
      query: ({ reviewText, rating, landId }) => ({
        url: `/traveler/rating/${landId}`,
        method: "POST",
        body: {
          review: reviewText,
          rating: rating,
        },
      }),
      
      invalidatesTags: (result, error, { landId }) => [
        { type: "Spot", id: landId },  
        "Reviews", 
      ],

    }),



  }),
});

export const {
  useSaveSpotMutation,
  useUnsaveSpotMutation,
  useGetAllSavedSpotsQuery,
  useGetBookingSpotsQuery,
  useUpdateTravelerProfileMutation,
  useChangePasswordMutation,
  useSubmitReviewMutation,
} = travelerApi;

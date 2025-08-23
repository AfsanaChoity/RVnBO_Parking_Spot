import { baseApi } from "./baseApi";

const travelerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveSpot: builder.mutation({
      query: (spotId) => ({
        url: `traveler/save/${spotId}`,
        method: "POST",
      }),
      invalidatesTags: ["SavedSpots"], // ensures saved list refreshes
    }),

    unsaveSpot: builder.mutation({
      query: (spotId) => ({
        url: `traveler/unsave/${spotId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedSpots"], // ensures sync
      async onQueryStarted(spotId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Optimistically update cache so UI feels instant
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
      providesTags: ["SavedSpots"], // so invalidatesTags works
    }),
  }),
});

export const {
  useSaveSpotMutation,
  useUnsaveSpotMutation,
  useGetAllSavedSpotsQuery,
} = travelerApi;

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


    getAllEarning: builder.query({
      query: () => ({
        url: "dashboard/earnings",
        method: "GET",
      }),
      providesTags: ["Earnings"],
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
  useGetAllEarningQuery,
  useGetAllTransactionQuery,
  useUpdateHostProfileMutation,
  useChangeHostPasswordMutation,

} = landownerApi;

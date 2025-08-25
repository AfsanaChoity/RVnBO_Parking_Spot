import { baseApi } from "./baseApi";

const landownerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

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
  
 useUpdateHostProfileMutation,
 useChangeHostPasswordMutation,
 
} = landownerApi;

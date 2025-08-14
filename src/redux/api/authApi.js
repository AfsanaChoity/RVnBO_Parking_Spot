import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.20.73:5000/api/' }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: 'auth/signup',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: 'auth/verify-email',
                method: 'POST',
                body: data,
            }),
        }),
        resendCode: builder.mutation({
            query: (email) => ({
                url: `auth/resend-code?email=${email}`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useVerifyEmailMutation,
    useResendCodeMutation,
} = authApi;

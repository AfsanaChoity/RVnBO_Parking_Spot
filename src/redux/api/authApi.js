import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.20.73:5000/api/' }),
    endpoints: (builder) => ({

        // user registration
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

        // user login
        login: builder.mutation({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data,
            }),
        }),

        // Forgot Password API Mutation
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),

        // verify email
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: 'auth/verify-email',
                method: 'POST',
                body: data,
            }),
        }),

        // resend code
        resendCode: builder.mutation({
            query: (email) => ({
                url: `auth/resend-verification-code`,
                method: 'POST',
                body: { email },
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useVerifyEmailMutation,
    useResendCodeMutation,
} = authApi;

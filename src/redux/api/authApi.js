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

         // verify email
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: 'auth/verify-email',
                method: 'POST',
                body: data,
            }),
        }),

        // resend verification code
        resendCode: builder.mutation({
            query: (email) => ({
                url: `auth/resend-verification-code`,
                method: 'POST',
                body: { email },
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

        // verify email for reset password
        verifyResetPassword: builder.mutation({
            query: (data) => ({
                url: 'auth/verify-reset-code',
                method: 'POST',
                body: data,
            }),
        }),

        // resend verification code for reset password
        resendResetCode: builder.mutation({
            query: (email) => ({
                url: `auth/resend-password-reset-code`,
                method: 'POST',
                body: { email },
            }),
        }),

        // resetting password
        resetPassword: builder.mutation({
            query: (data) => ({
                url: 'auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),
       
    }),
});

export const {
    useSignupMutation,
    useVerifyEmailMutation,
    useResendCodeMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useVerifyResetPasswordMutation,
    useResendResetCodeMutation,
    useResetPasswordMutation,
    
} = authApi;

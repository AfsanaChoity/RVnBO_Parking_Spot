import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // booking spot
        createBooking: builder.mutation({

            query: ({ bookingData, landId }) => ({
                url: `/booking/${landId}`,
                method: 'POST',
                body: bookingData,
            }),
        }),


        // Verify booking OTP
        verifyBookingOtp: builder.mutation({
            query: ({ bookingId, code }) => ({
                url: `/booking/verifybooking/${bookingId}`,
                method: "POST",
                body: { code },
            }),
        }),

        // ✅ Payment checkout
        paymentCheckout: builder.mutation({
            query: (bookingId) => ({
                url: `/payment/checkout/${bookingId}`,
                method: "POST",
            }),
        }),

    })
})

export const {

    useCreateBookingMutation,
    useVerifyBookingOtpMutation,
    usePaymentCheckoutMutation,


} = bookingApi;

export default bookingApi;
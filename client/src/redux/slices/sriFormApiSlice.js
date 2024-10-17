import { apiSlice } from './apiSlice'
const SRI_FORM_URL = '/api/forms/sri'

export const sriFormApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitSriForm: builder.mutation({
      query: (data) => ({
        url: SRI_FORM_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useSubmitSriFormMutation } = sriFormApiSlice

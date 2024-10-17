import { apiSlice } from './apiSlice'
const GRATUITY_FORM_URL = '/api/forms/gratuity'

export const gratuityFormApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitGratuityForm: builder.mutation({
      query: (data) => ({
        url: GRATUITY_FORM_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useSubmitGratuityFormMutation } = gratuityFormApiSlice

import { apiSlice } from './apiSlice'
const FORM_URL = '/api/forms'

export const formApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllForms: builder.query({
      query: ({ typeQuery, statusQuery }) => {
        let url = FORM_URL
        const params = new URLSearchParams()

        if (typeQuery) {
          params.append('type', typeQuery)
        }

        if (statusQuery) {
          params.append('status', statusQuery)
        }

        const queryString = params.toString()
        if (queryString) {
          url += `?${queryString}`
        }

        return {
          url: url,
          method: 'GET',
        }
      },
    }),
    getSingleForm: builder.query({
      query: (id) => ({
        url: `${FORM_URL}/${id}`,
        method: 'GET',
      }),
    }),
    updateFormStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `${FORM_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetAllFormsQuery,
  useGetSingleFormQuery,
  useUpdateFormStatusMutation,
} = formApiSlice

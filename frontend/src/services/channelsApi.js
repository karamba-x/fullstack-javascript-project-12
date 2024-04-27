import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState();
      headers.set('Authorization', `Bearer ${auth.token}`);
      return headers;
    }, 
  }),
  
  tagTypes: ['Channels, Messages'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
  }),
});

const {
  useGetChannelsQuery,
} = channelsApi;

export {
  useGetChannelsQuery as useGetChannels,
};
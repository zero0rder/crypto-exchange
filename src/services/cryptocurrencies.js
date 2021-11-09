import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dotenv from 'dotenv'; 
dotenv.config();

const cryptoHeaders = {
    'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
};

const baseURL = process.env.REACT_APP_RAPIDAPI_BASEURL;
const createRequest = (url) => ({url, headers: cryptoHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins/?limit=${count}`)
        }),
        getCoinDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        }),
    }),
});

export const { useGetCryptosQuery, useGetCoinDetailsQuery, useGetExchangesQuery } = cryptoApi;
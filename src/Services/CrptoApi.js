import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const CryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'd611e7e35fmsh879f313b7dfce02p1482dajsn63ebe2e60020'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) =>({ url , headers : CryptoApiHeaders })
export const cryptoApi = createApi({
    reducerPath : 'cryptoApi',
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints : (builder)=>({
        getCryptos : builder.query({
            query : (count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCoinDetails : builder.query({
            query : (coinId)=> createRequest(`/coin/${coinId}`)
        }),
        getCoinHistory : builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
        })
    
    })
});
export const {
    useGetCryptosQuery ,
    useGetCoinDetailsQuery,
    useGetCoinHistoryQuery

} = cryptoApi;

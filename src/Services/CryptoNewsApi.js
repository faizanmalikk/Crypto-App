import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const CryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': 'd611e7e35fmsh879f313b7dfce02p1482dajsn63ebe2e60020'
}
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';
const createRequest = (url) =>({ url , headers : CryptoNewsApiHeaders })
export const cryptoNewsApi = createApi({
    reducerPath : 'cryptoNewsApi',
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints : (builder)=>({
        getCryptosNews : builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    
    })
});
export const {
    useGetCryptosNewsQuery ,

} = cryptoNewsApi;
import { fetchData } from '../index'

const baseURL = process.env.REACT_APP_BASE_URL
const globalURL = `${ baseURL }/global`
const cryptosURL =`${ baseURL }/cryptos`
const exchangesURL = `${ baseURL }/exchanges`
const opts = {
    method: 'GET',
}

export const getGlobalStats = () => fetchData(`${globalURL}`, opts)
export const getCryptos = (limit) => fetchData(`${cryptosURL}/${limit}`, opts)
export const getCryptoInfo = (id) => fetchData(`${cryptosURL}/info/${id}`, opts)
export const getCryptoQuote = (id) => fetchData(`${cryptosURL}/quotes/${id}`, opts)
export const getExchanges = (limit = 10) => fetchData(`${exchangesURL}/${limit}`, opts)
export const getExchangeDetail = (id) => fetchData(`${exchangesURL}/info/${id}`, opts)

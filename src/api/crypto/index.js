const baseURL = process.env.REACT_APP_BASE_URL;
const globalURL = `${ baseURL }/global`;
const cryptosURL =`${ baseURL }/cryptos`;
const exchangesURL = `${ baseURL }/exchanges`;

export const getGlobalCryptoData = () => fetchCryptoData(`${globalURL}`);
export const getCryptos = (limit) => fetchCryptoData(`${cryptosURL}/${limit}`);
export const getCryptoInfo = (id) => fetchCryptoData(`${cryptosURL}/info/${id}`);
export const getCryptoQuotes = (id) => fetchCryptoData(`${cryptosURL}/quotes/${id}`);
export const getExchanges = (limit = 10) => fetchCryptoData(`${exchangesURL}/${limit}`);
export const getExchangeDetail = (id) => fetchCryptoData(`${exchangesURL}/info/${id}`);

async function fetchCryptoData(url){
    const response = await fetch(url).then(res => {
        if(res.ok)
            return res.json();
        
        throw res;
    
    }).then(data => data).catch(err => {
        console.error('error in api', err);
    });

    return  response;
}
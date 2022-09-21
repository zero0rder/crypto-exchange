export async function fetchData(url, opts){
    const response = await fetch(url, opts).then(res => {
        if(res.ok)
            return res.json()
        
        throw res
    
    }).then(data => data).catch(err => {
        console.error('error in api', err)
    })

    return  response
}
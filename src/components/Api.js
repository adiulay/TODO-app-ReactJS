import React, { useEffect, useState } from 'react'

function API () {
    const [country, setCountry] = useState([])
    const [code, setCode] = useState([])
    const [currency, setCurrency] = useState([])
    const [symbol, setSymbol] = useState([])

    async function fetchCountry(countryName) {
        // fetches the country name
        const fetchCountryName = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    
        // convert it to json response
        const response = await fetchCountryName.json()
    
        // error checks if country does not exist
        if ("status" in response) {
            return response
        }
        
        return response[0]
    }
    
    async function fetchCurrency(countryCode) {
        // fetches currency
        const fetchCurrency = await fetch(`https://finnhub.io/api/v1/forex/rates?base=${countryCode}&token=bu2f3jv48v6uohsq6tr0`)
    
        // convert it to json response
        const response = await fetchCurrency.json()
    
        if ("error" in response) {
            return response.error
        }
    
        return response.quote
    }

    useEffect(() => {
        fetchCountry('Canada').then(resCode => {
            if ("status" in resCode) {
                return setCode(resCode.message)
            }

            setCountry(resCode)
            setCode(resCode.currencies[0].code)
            setSymbol(resCode.currencies[0].symbol)

            fetchCurrency(resCode.currencies[0].code).then(resCurrency => {

                // convert objects to array within array
                var objectArray = Object.entries(resCurrency)

                var arrayList = []

                objectArray.forEach(([key, value]) => {

                    var object = {
                        code: key,
                        currency: value
                    }

                    arrayList.push(object)
                })
                setCurrency(arrayList)

            })
        })
        
    }, [])

    const currencyList = currency.map(item => (
        <p key={item.code}>{item.code}: {item.currency}</p>
    ))

    return (
    <div>
        <div>
            <h4>{code}, {country.name} with a population of {country.population} people</h4>
            <p>Below are conversion rate of {code} = {symbol}1</p>
        </div>
        
        <div>{currencyList}</div>
    </div>
    )
}

export default API
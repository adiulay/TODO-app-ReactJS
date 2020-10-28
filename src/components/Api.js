import React, { useEffect, useState } from 'react'

function API () {
    const [country, setCountry] = useState('Canada')
    const [code, setCode] = useState([])
    const [population, setPopulation] = useState('')
    const [currency, setCurrency] = useState([])
    const [symbol, setSymbol] = useState([])
    const [userInput, setUserInput] = useState('')

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

    async function fetchCountryByCurrency(symbol) {
        const fetchCountry = await fetch(`https://restcountries.eu/rest/v2/currency/${symbol}`)

        const response = await fetchCountry.json()
        
        if ("status" in response) {
            return response
        }

        return response.name
    }

    useEffect(() => {
        fetchCountry(country).then(resCode => {
            if ("status" in resCode) {
                return setCode(resCode.message)
            }

            setCountry(resCode.name)
            setCode(resCode.currencies[0].code)
            setPopulation(resCode.population)
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
        
    }, [country])

    const currencyList = currency.map(item => (
        <p key={item.code}>{item.code}: {item.currency}</p>
    ))

    function handleSubmit(e) {
        e.preventDefault()
        setCountry(userInput)
    }

    function handleChange(e) {
        setUserInput(e.target.value)
    }

    const result = (
        <div>
            <form onSubmit={handleSubmit}>
                <input className='input input__lg' placeholder='Canada' onChange={handleChange}/>
                <button type='submit' className='btn btn__primary btn__lg'>
                    Search
                </button>
            </form>
            
            <div>
                <h4>{code}, {country} with a population of {population} people</h4>
                <p>Below are conversion rate of {code} = {symbol}1</p>
            </div>
            
            <div>{currencyList}</div>
        </div>
    )

    const error = (
        <div>
            <form onSubmit={handleSubmit}>
                <input className='input input__lg' placeholder='Canada' onChange={handleChange}/>
                <button type='submit' className='btn btn__primary btn__lg'>
                    Search
                </button>
            </form>
            <h1>Error: {code}</h1>
        </div>
    )
    
    
    return code === "Not Found" ? error : result
}

export default API
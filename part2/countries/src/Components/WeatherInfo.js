import weatherService from '../Services/countries'
import { useState, useEffect } from 'react'

const WeatherInfo = ({ city }) => {
    const [weatherInfo, setWeatherInfo] = useState([])
    const baseURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${city[0]}&lon=${city[1]}&appid=${process.env.REACT_APP_API_KEY}`
    
    //console.log(baseURL)
    useEffect(() => {
        weatherService.getAll(baseURL)
        .then(response => {
            setWeatherInfo(response)
            console.log('weather response: ', response)
        }).catch(error => console.log(error))
    },[])
    
    // if(weatherInfo.length === 0){return null}
    //const imgSrc = ``
    // console.log(imgSrc)
    if(weatherInfo.length === 0){
        return (
            <div>No weather info can be fetched</div>
        )
    }

    return (
        <>
        <div>temputure {(weatherInfo.current.temp - 273.15).toFixed(2)} °C</div>
        <img src={`https://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@2x.png`} />
        <div>wind {weatherInfo.current.wind_speed} m/s</div>
        </>
    )
}
// <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} />
export default WeatherInfo;
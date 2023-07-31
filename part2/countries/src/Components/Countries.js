import WeatherInfo from './WeatherInfo.js'

const Countries = ({ countries, setCountriesToShow }) => {
    //console.log(countries[0].name)
    if(countries.length === 0) {
        return null
    }
    
    //
    console.log('Countries language: ', Object.values(countries[0].languages))
    if(countries.length === 1) {
        const languages = Object.values(countries[0].languages)
        return(
            <>
                <h1>{countries[0].name.common}</h1>
                <div>{countries[0].capital}</div>
                <div>area {countries[0].area}</div>
                <h3>languages:</h3>
                <p>{languages.map((language)=><li key={language}>{language}</li>)}</p>
                <img src={countries[0].flags.png} alt={countries[0].flags.alt}/>
                <h3>Weather in {countries[0].capital}</h3>
                <WeatherInfo city={countries[0].latlng}/>
            </>
        )
    }else{
        return(
            countries.map(
                (country) => <div key={country.name.offical}>{country.name.common}
                <button onClick={()=>setCountriesToShow([country])}>Show</button>
                </div>
            )
        )
    }
}

export default Countries;
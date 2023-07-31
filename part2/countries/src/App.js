import { useState, useEffect } from 'react'
import Search from './Components/Search.js'
import Countries from './Components/Countries.js'
import conuntryServices from './Services/countries.js'

function App() {
  const [conuntries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [search, setSearch] = useState('');
  const baseURL = 'https://restcountries.com/v3.1/all'

  const searchCountries = (e) => {  
    //console.log(e.target.value)
    const search = e.target.value
    setSearch(search)
    setCountriesToShow(conuntries.filter(country => 
      country.name.common.toLowerCase().includes(search.toLowerCase())
    ))
  }

  useEffect(() => {
    conuntryServices
    .getAll(baseURL)
    .then(response => {
      setCountries(response)
      console.log('response from api: ', response)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  return (
    <div>
      <Search handleChange={searchCountries} value={search} />
      {
        countriesToShow.length === 0 ? 
        (<p>Please enter the query</p>) : 
        null
      }
      {
        countriesToShow.length > 10 ? 
        (<p>Too many matches, specify another filter</p>) : 
        (<Countries countries={countriesToShow} 
        setCountriesToShow={setCountriesToShow}/>)
      }
      
    </div>
  );
}

export default App;

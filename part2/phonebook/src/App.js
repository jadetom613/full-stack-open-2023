import { useState, useEffect } from 'react'
import Persons from './Componenets/Persons.js'
import PersonForm from './Componenets/PersonForm.js'
import Filter from './Componenets/Filter.js'
import Notification from './Componenets/Notification.js'
import personService from './Servies/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterPersons, setFilterPersons] = useState([])
  const [message, setMessage] = useState(null)
  const baseURL = '/api/persons'

  useEffect(() => {
    personService
    .getAll(baseURL)
    .then(response => {
      console.log('data: ', response)
      setPersons(response)
    })
    .catch(error => {
      console.log(error.response)
    }
    )
  },[])

  const handleChange = (e) => {
    //console.log('name: ', e.target.value)
    setNewName(e.target.value)
  }

  const handleNumChange = (e) => {
    //console.log('name: ', e.target.value)
    setNewNum(e.target.value)
  }

  const handleFilterChange = (e) => {
    //console.log('filterName: ', e.target.value)
    console.log('filter persons:', persons);
    const filter = e.target.value
    setFilterName(filter) 
    setFilterPersons(
      persons.filter((person)=>{
        //console.log('person in filter: ', person)
        //console.log(person.name.toLowerCase().includes(filter.toLowerCase()))
        return person.name.toLowerCase().includes(filter.toLowerCase())
      }
        )
    )
  }

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name:newName,
      number:newNum
    }
    
    // persons.some((person)=>person.name === newName)
    const matchPerson = persons.find(person => person.name === newName)
    if (matchPerson) {
      //alert(`${newName} with number ${newNum} is already added to phonebook`)
      console.log('addPerson newName: ', matchPerson)
      if(window.confirm(`${newName} is already added to phonebook, replacethe old number with a new one?`)){
        personService
        .update(baseURL, matchPerson.id, newPerson)
        .then(response => {
          //console.log('match update: ', response)
          setMessage(`${newName} update success!!`)
          setPersons(persons.map(person => person.id !== matchPerson.id ? person : response))
          setFilterPersons(persons.map(person => person.id !== matchPerson.id ? person : response))
        })
        .catch(error => {
          console.log(error)
          setMessage('Update unsucessful!!')
        })
      }
    }else{
      personService
      .create(baseURL, newPerson)
      .then(response => {
        console.log('add person:', response)
        setMessage(`${newName} added success!!`)
        setPersons(persons.concat(response))
        setFilterPersons(persons.concat(response))
      })
      .catch(error => {
        console.log(error)
        setMessage('Create fail!!')
        setTimeout(() => {
            setMessage(null)
        },5000)
      })
    }
    setNewName('')
    setNewNum('')
  }

  const delPerson = (id, name) => {
    if(window.confirm(`Do want to delete ${name} from phonebook`)){
      personService.del(baseURL, id)
      .then(response => {
        const updatePersons = persons.filter(person => person.id !== id)
        setPersons(updatePersons)
        setMessage(`${name} removed success!!`)
      })
      .catch(error => {
        console.log(error)
        setMessage(`Information of ${name} has already been removed from server`)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter 
        handleFilterChange={handleFilterChange} 
        name={filterName} 
      />
      <h3>add a New</h3>
      <PersonForm 
        handleSubmit={addPerson} 
        handleChange={handleChange} 
        handleNumChange={handleNumChange} 
        name={newName} 
        num={newNum}
      />
      <h3>Numbers</h3>
      <Persons 
        personToShow={filterPersons}
        deletePerson={delPerson}
      />
    </div>
  )
}

export default App
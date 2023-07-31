const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('data', (request, response) => {return request.method === 'POST' ? JSON.stringify(request.body) : ''})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data :date[iso]'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
  //console.log(request)  
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).send('No data found').end()
  }
})

const generateId = () => {
  const randomID = Math.floor(Math.random()*99999)
  return randomID
}

const checkName = (name) => {
    const found = persons.some((person) => person.name === name)
    return found
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if(!body.name || !body.number){
    return response.status(400).json({ 
        error: 'please provide the required info' 
      })
  }

  if (checkName(body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())
morgan.token('data', (request, response) => {return request.method === 'POST' ? JSON.stringify(request.body) : ''})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data :date[iso]'))
app.use(express.static('build'))

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
  //
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date}</p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {response.json(persons)})
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  Person.findById(request.params.id)
  .then(person => {
    if (person){
      response.json(person)
    }else {
      response.status(404).send('No data found').end()
    }
  })
  .catch(error => {
    console.log(error)
    response.status(500).end()
  })
})

const checkName = (name) => {
    const found = Person.find(name)
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

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
  .then(() => {
    response.status(204).end()
  })
  .catch(error => {
    console.log(error.message)
  })

  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

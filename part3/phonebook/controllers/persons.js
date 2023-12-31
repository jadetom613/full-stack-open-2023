const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
})

personsRouter.get('/info', (request, response, next) => {
  Person.count({})
    .then((count) => {
      response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date}</p>`)
    })
    .catch(error => next(error))
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person)
      }else {
        response.status(404).send('No data found').end()
      }
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next)  => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'please provide the required info'
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
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new:true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


personsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = personsRouter

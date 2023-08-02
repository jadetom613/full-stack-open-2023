const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://jadetam:${password}@fullstack.nktx9gi.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
const person = new Person({
  name: name,
  number: number,
})

if(process.argv.length === 3){
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
     console.log(person.name + " " + person.number)
    })
    mongoose.connection.close()
    })
}else if (process.argv.length<5) {
  console.log('give password/name/number as argument, e.g.node mongo.js password name number')
  process.exit(1)
}else{
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
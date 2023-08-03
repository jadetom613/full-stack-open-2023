// mongondb configuration
const mongoose = require('mongoose')

function numValidator(num) {
  return /\d{2,3}-\d*/.test(num)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: numValidator,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //console.log('returnedObject._id: ', returnedObject._id, 'returnedObject: ', returnedObject)
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
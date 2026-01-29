const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

mongoose.connect(url, { family: 4 })
  .then(
    () => {console.log('connected to database')}
  )
  .catch(
    error => {console.log('error connecting to database', error.message)}
  )

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        if (v.length < 8) return false

        const parts = v.split('-')

        if (parts.length !== 2) return false

        const[first, second] = parts
        const onlyNumbersRegex = /^\d+$/

        if (!onlyNumbersRegex.test(first) || !onlyNumbersRegex.test(second)) return false

        if (first.length !== 2 && first.length !== 3) return false

        return true
      },
      message: props => `${props.value} is not a valid phone number. Valid format examples: 09-1234556 and 040-22334455`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
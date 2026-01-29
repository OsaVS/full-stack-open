require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
    .catch(error => {
      next(error)
    })
})

app.get('/api/info', (req, res, next) => {
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
  })
    .catch(error => {
      next(error)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        console.log(person)
        res.json(person)
      } else {
        res.status(404).send({ error: 'Person not found' })
      }

    })
    .catch(error => {
      next(error)
    })

})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})



app.post('/api/persons',(req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return (res.status(400).json({
      error:'Content Missing'
    }))
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(result => {
      console.log('person added successfully')
      res.json(result)
    })
    .catch(error => {next(error)})
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return (res.status(400).json({
      error:'Content Missing'
    }))
  }
  Person.findById(req.params.id)
    .then(person => {
      if(!person){
        res.status(404).end()
      }
      person.number = body.number

      person.save().then(result => {
        res.json(result)
      })
        .catch(error => {
          next(error)
        })
    })
    .catch(error => {
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})


require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));


morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status - :response-time ms :body'));

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  })
});

app.get('/api/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
  })
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = Person.findById(id)
  .then(person => {
    console.log(person)
    res.json(person);
  })
  .catch(error => {
    res.status(404).end()
  })
  
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
        .then(result => {
            res.status(204).end();
        })  
})



app.post('/api/persons',(req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return (res.status(400).json({
      error:"Content Missing"
    }))
  }

  Person.find({ name: {$regex: body.name, $options: 'i'}})
        .then(result => {
          if (result.length > 0) {
              return (res.status(409).json({
                error:"name must be unique"
              }))
          }
        })

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
        .then(result => {
          console.log('person added successfully')
          res.json(result)
        })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return (res.status(400).json({
      error:"Content Missing"
    }))
  }
  Person.findByIdAndUpdate(req.params.id, {
      name: body.name,
      number: body.number, 
    },
    { new: true, runValidators: true })
        .then(result => {
          res.json(result)
        })
        .catch(error => {
          res.status(400).end()
        })
})

// const generateId = () => {
//   return Math.floor(Math.random() * 1000);
// }

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


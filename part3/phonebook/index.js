const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()
const Person = require('./models/person')
const app = express()
const mongoose = require('mongoose')

morgan.token('type', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

let persons = []

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

app.post('/api/persons/', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: "name missing"
    })
  }

  if (persons.filter(person => person.name === body.name).length === 1) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: "phone number missing"
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(result => {
    res.status(204).end()
  }).catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id!' })
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
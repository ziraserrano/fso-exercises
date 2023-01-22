const express = require('express')
const app = express()
const PORT = 3001

const persons = [
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

app.get( '/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const info = persons.length
    const date = new Date()
    response.json(`Phonebook has info for ${info} people` + " " + date)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find( person => person.id === id)

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})
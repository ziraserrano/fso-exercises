const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

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


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.filter( person => person.id !== id)

    response.status(204).end()
})

// make a function that allows random id to be generated
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
} 

app.post('/api/persons', (request, response) => {
    //add app.use(express.json()) to the top to activate json-parser
    const body = request.body
    console.log(body)
    response.json(body)
    

    // review the code below 
    if(body.name === persons.name || !body.number){
        return response.status(404).json({
            error: 'name taken or number is missing!'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    console.log(person)
})

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})
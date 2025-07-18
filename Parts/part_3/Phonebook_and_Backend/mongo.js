const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Wrong number of argument')
    process.exit(1)

}

const password = process.argv[2]
const url = `mongodb+srv://potsu:${password}@fullstack.n3ttzhe.mongodb.net/?retryWrites=true&w=majority&appName=fullstack`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        var phonebook = 'Phonebook:'
        result.forEach(person => {
            phonebook = phonebook.concat(`\n${person.name} ${person.number}`)
        })
        console.log(phonebook)
        mongoose.connection.close()
    })

} else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log('Add', result.name, 'number', result.number, 'to phonebook')
        mongoose.connection.close()
    })
}

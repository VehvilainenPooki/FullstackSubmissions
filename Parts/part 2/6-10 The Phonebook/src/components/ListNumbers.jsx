import Person from './Person'

const ListNumbers =({personList, filter}) => {
    return (
        <div>
            {personList.filter(person =>
                person.name.toLowerCase().includes(filter)
                ).map(person => 
                    <Person key={person.id} person={person} />
                )
            }
        </div>
    )
}

export default ListNumbers

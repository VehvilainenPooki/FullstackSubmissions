import Person from './Person'

const ListNumbers =({personList, filter, removeEvent}) => {
    return (
        <div>
            {personList.filter(person =>
                person.name.toLowerCase().includes(filter)
                ).map(person => 
                    <Person key={person.id} person={person} removeEvent={removeEvent}/>
                )
            }
        </div>
    )
}

export default ListNumbers

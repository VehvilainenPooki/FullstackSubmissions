const Person = ({ person, removeEvent }) => {
    return (
      <p>{person.name} {person.number} <button value={person.id} onClick={removeEvent}>delete</button></p>
    )
  }
  
  export default Person
  
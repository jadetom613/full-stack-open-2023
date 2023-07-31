const Persons = ({personToShow, deletePerson}) => {
    return(
      personToShow.map(
        (person)=>
        {return(
            <div key={person.id}>{person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
            </div>
        )})
    )
}

export default Persons;
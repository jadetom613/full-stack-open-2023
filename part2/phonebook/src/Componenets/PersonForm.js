const PersonForm = ({handleSubmit, handleChange, handleNumChange, name, num}) => {
    return(
      <form onSubmit={handleSubmit}>
          <div>
            name: <input onChange={handleChange} value={name}/>
          </div>
          <div>
            number: <input onChange={handleNumChange} value={num}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}

export default PersonForm;
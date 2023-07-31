const Filter = ({handleFilterChange, name}) => {
    return(
      <form>
          <div>
            filter shown with <input onChange={handleFilterChange} value={name}/>
          </div>
      </form>
    )
}

export default Filter;
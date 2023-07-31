const Search = ({handleChange}) => {
    return (
        <form>
            <div>
                find countries: <input onChange={handleChange}/>
            </div>
        </form>   
    )
}

export default Search;
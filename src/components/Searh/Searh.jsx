import "./Searh.css"

const Search = () => {
    return(
        <div className="search">
            <i className="search-ico"/>
            <input type="text"
                   className="search-input"
                   placeholder="Номер заказа, товар или номер телефона заказчика..."/>
        </div>
    )
}

export default Search
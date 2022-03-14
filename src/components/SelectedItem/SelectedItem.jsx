import "./SelectedItem.css"

const SelectedItem = ({item, deleteItem}) => {

    return (
        <div className="selected_item"><span>
            {item.title ? item.title :
                item.name ? item.name : null}
            {item.name && item.lastName ? <> {item.lastName}</> : null}</span>
            <button onClick={(event) => deleteItem && deleteItem(event)} className="selected_item-button">+</button>
        </div>
    )
}

export default SelectedItem
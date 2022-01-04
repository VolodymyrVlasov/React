import "./SelectedItem.css"

const SelectedItem = ({item, deleteItem}) => {

    return (
        <div className="selected_item"><span>
            {item.title ? item.title :
                item.name ? item.name : null}
            {item.name && item.lastname ? <> {item.lastname}</> : null}</span>
            <button onClick={() => deleteItem && deleteItem()} className="selected_item-button">+</button>
        </div>
    )
}

export default SelectedItem
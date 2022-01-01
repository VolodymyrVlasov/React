import "./SelectedItem.css"

const SelectedItem = ({item, deleteItem}) => {

    return (
        <div className="selected_item">
            <span>{item.name}</span>
            <button onClick={() => deleteItem()} className="selected_item-button">+</button>
        </div>
    )
}

export default SelectedItem
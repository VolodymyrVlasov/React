import defaultAvatar from "../../img/ico-default-avatar.webp";

const TodoInfo = ({order}) => {
    return (
        <div className="col-left">
            <div className="row-h-center_v-spb">
                <p className="text-label half">Заказчик</p>
                <p className="text-label half">Поставил задачу</p>
            </div>
            <div className="row-h-center_v-spb">
                <p className="half">{order.customer?.name}</p>
                <div className="row-left half manager-label">
                    <img className="xsm-avatar" src={defaultAvatar} alt="avatar"/>
                    <span>{order.manager?.name}</span>
                </div>
            </div>
        </div>
    )
}

export default TodoInfo
import defaultAvatar from "../../img/ico-default-avatar.webp";

const TodoInfo = ({task}) => {
    return (
        <div className="col">
            <div className="row-h-center_v-spb">
                <p className="text-label half">Заказчик</p>
                <p className="text-label half">Поставил задачу</p>
            </div>
            <div className="row-h-center_v-spb">
                <p className="half">{task.customer?.name}</p>
                <div className="row half manager-label">
                    <img className="xsm-avatar" src={defaultAvatar} alt="avatar"/>
                    <span>{task.manager?.name}</span>
                </div>
            </div>
        </div>
    )
}

export default TodoInfo
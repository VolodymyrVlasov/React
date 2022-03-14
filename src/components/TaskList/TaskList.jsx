import {useEffect} from "react";

const TaskList = ({order}) => {
    return (
        <div className="col-left">
            <div className="row-h-center_v-spb">
                <span className="half text-label">Задача</span>
                <span className="half text-label">Тираж</span>
            </div>
            <ul className="task--tasks-list col-left gap-12">
                {order.cartItems?.map(cartItem => {
                    return (
                        <li key={cartItem.cartItemId} className="row-left">
                            <span className="half">• {cartItem.product.name}</span>
                            <div className="half row-h-center_v-spb">
                                <span>{cartItem.amount} шт</span>
                                {/*{task.path != null && <a aria-label="-sdd" className="sm-link-to-folder" href={`file://${order.path}`}/>}*/}
                            </div>
                        </li>
                    )
                })
                }
            </ul>
        </div>)
}

export default TaskList
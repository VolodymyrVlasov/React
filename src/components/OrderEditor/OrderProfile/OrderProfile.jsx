import {useOrder} from "../../../hooks/useOrder";
import {formatDate} from "../../../utils/utils";
import DateEditor from "../DateEditor/DateEditor";

const OrderProfile = () => {
    const [{orderId, manager, maker, customer, createdDate, editedDate, finishedDate}] = useOrder()

    return (
        <aside className="col-left gap-24 full-width">
            <div className="col-left gap-8 full-width">
                <p className="text-primary-label">Order id</p>
                <p className="text-h1--bold">{orderId}</p>
            </div>
            <div className="col-left gap-8 full-width">
                <p className="text-primary-label">Created</p>
                <p className="text-h4--bold">{formatDate(createdDate)}</p>
            </div>
            <div className="col-left gap-8 full-width">
                <p className="text-primary-label">Last edited</p>
                <p className="text-h4--bold">{formatDate(editedDate)}</p>
            </div>
            <div className="col-left gap-8 full-width">
                <p className="text-primary-label">Must be finished</p>
                <DateEditor initialDate={finishedDate}/>
            </div>
        </aside>
    )
}

export default OrderProfile
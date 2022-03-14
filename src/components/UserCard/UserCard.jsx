import {getEnumNames} from "../../utils/utils";
import "./UserCard.css"

const UserCard = ({user}) => {
    return (
        <li className='theme-card user-card-cnt row-vertical-center' draggable={true}>
            <span className='flex-2'>{user.name} {user.lastName}</span>
            <a className='flex-1' href={`tel:${user.phone}`}>{user.phone}</a>
            <a className='flex-1' href={`mailto:${user.email}`}>{user.email}</a>
            <div className="flex-2 row-left gap-12">
                {user.role
                    .sort((a,  b) => a.localeCompare(b))
                    .map((role, index) => <div className='item-tag' key={index}>{getEnumNames([role])[0]["name"]}</div>)
                    }
            </div>
        </li>
    )
}

export default UserCard
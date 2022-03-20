import "./Header.css"
import Button from "../Button/Button";
import ProfileButton from "../ProfileButton/ProfileButton";
import {useAppContext} from "../../hooks/useAppContext";
import Logo from "../Logo/Logo";
import UniSearch from "../UniSearch/UniSearch";

const Header = () => {
    const [, appDispatch] = useAppContext()

    const handleClose = () => {
        appDispatch({type: "changeNewTaskPopup"})
    }

    return (
        <header className="container header row-vertical-center gap-24">
            <div className='row-left gap-24 flex-1'>
                <Logo/>
            </div>
            <div className="flex-2">
                <UniSearch
                    placeholder={"Номер заказа, товар или номер телефона заказчика..."}
                    isIcon={true}
                />
            </div>
            <div className='row-right gap-24 flex-1'>
                <Button buttonText="Add order" onClickFunc={handleClose}/>
                <ProfileButton/>
            </div>
        </header>
    )
}

export default Header

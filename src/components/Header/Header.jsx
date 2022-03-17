import "./Header.css"
import Search from "../Searh/Searh";
import Button from "../Button/Button";
import ProfileButton from "../ProfileButton/ProfileButton";
import {useAppContext} from "../../hooks/useAppContext";
import Logo from "../Logo/Logo";

const Header = () => {
    const [, appDispatch] = useAppContext()

    const handleClose = () => {
        appDispatch({type: "changeNewTaskPopup"})
    }

    return (
        <>
            <header className="container header row-vertical-center">
                <div className='row-left gap-24 flex-1'>
                    <Logo/>
                </div>
                <Search placeholder={"Номер заказа, товар или номер телефона заказчика..."}/>
                <div className='row-right gap-24 flex-1'>
                    <Button buttonText="Add order" onClickFunc={handleClose}/>
                    <ProfileButton/>
                </div>
            </header>
        </>
    )
}

export default Header

import "./Header.css"
import logo from "../../img/logo.svg"
import Search from "../Searh/Searh";
import Button from "../Button/Button";
import ProfileButton from "../ProfileButton/ProfileButton";

const Header = () => {
    return (
        <header className="header container row">
            <a href="/" aria-label="logo">
                <img src={logo} alt="TODO"
                     width="100px" height="100px"
                     decoding="async" loading="lazy"
                     className="logo"/>
            </a>
            <Search/>
            <div className="row gap-24">
               <Button text="Add order"/>
                <ProfileButton/>
            </div>
        </header>
    )
}

export default Header
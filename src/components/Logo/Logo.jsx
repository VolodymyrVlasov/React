import logo from "../../img/logo.svg";
import "./Logo.css"

const Logo = () => {
    return (
        <a href="/" aria-label="logo" className='row-vertical-center'>
            <img src={logo} alt="company-logo"
                 width="100" height="38"
                 decoding="async" loading="lazy"
                 className="logo"/>
        </a>
    )
}

export default Logo
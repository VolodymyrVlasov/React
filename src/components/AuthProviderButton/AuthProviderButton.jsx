import "./AuthProviderButton.css"
import icoGoogle from "../../img/ico-google.svg"
import icoGithub from "../../img/ico-github.png"
import icoFacebook from "../../img/ico-facebook.png"
import {useEffect, useState} from "react";

const AuthProviderButton = ({handleClick, type}) => {
    const [icon, setIcon] = useState(icoGoogle)
    const [label, setLabel] = useState("Google")

    useEffect(() => {
        switch (type) {
            case "google":
                setIcon(icoGoogle)
                setLabel("Google")
                break
            case "github":
                setIcon(icoGithub)
                setLabel("Github")
                break
            case "facebook":
                setIcon(icoFacebook)
                setLabel("Facebook")
                break
        }
    }, [])

    return (
        <button type='submit' className='google-btn' onClick={() => handleClick()}>
            <i style={{backgroundImage: `url("${icon}"`}} className='google-btn-icon'/>
            <span className='google-btn-text'>Login with {label}</span>
        </button>
    )
}

export default AuthProviderButton
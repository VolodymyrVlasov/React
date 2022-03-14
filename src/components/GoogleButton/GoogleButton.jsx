import "./GoogleButton.css"
import ico from "../../img/ico-google.svg"

const GoogleButton = ({handleClick}) => {
    return (
        <button type='submit' className='google-btn' onClick={(e) => handleClick(e, 'loginWithGoogle')}>
            <i style={{backgroundImage: `url("${ico}"`}} className='google-btn-icon'/>
            <span className='google-btn-text'>Login with Google</span>
        </button>
    )
}

export default GoogleButton
import "./PageNotFound.css"
import Button from "../../components/Button/Button";
import {CSSTransition} from "react-transition-group";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const PageNotFound = () => {
    const navigate = useNavigate()
    const [isAnimate, setIsAnimate] = useState(false)

    useEffect(() => setIsAnimate(true), [])

    const handleHomeButton = () => {
        navigate('/login', {replace: true})
    }

    return (
        <CSSTransition in={isAnimate} timeout={700}
                       classNames="fade-animation" unmountOnExit>
            <section className='container col-center page-not-found-cnt'>
                <h1 className='page-not-found-404'>404</h1>
                <p className='page-not-found-notfound'>Not Found!</p>
                <Button buttonText='Go Home' onClickFunc={handleHomeButton}/>
            </section>
        </CSSTransition>
    )
}

export default PageNotFound
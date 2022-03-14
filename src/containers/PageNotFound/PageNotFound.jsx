import "./PageNotFound.css"
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";

const PageNotFound = () => {
    const handleHomeButton = () => {
      window.open('/dashboard', '_self')
    }

    return (
        <section className='container col-left page-not-found-cnt'>
            <h1 className='page-not-found-404'>404</h1>
            <p className='page-not-found-notfound'>Not Found!</p>
            <Button buttonText='Go Home' onClickFunc={handleHomeButton}/>
        </section>
    )
}

export default PageNotFound
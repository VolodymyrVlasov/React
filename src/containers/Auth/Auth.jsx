import Logo from "../../components/Logo/Logo";
import {useAppContext} from "../../hooks/useAppContext";
import {useEffect, useState} from "react";
import {createUserWithEmailPassword, logOut, signInWithEmailPassword, signInWithGoogle} from "../../utils/firebase";
import {useAuth} from "../../hooks/useAuth";
import {Navigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/Button/Button";

import "./Auth.css"
import Loading from "../../components/Loading/Loading";
import {CSSTransition} from "react-transition-group";
import GoogleButton from "../../components/GoogleButton/GoogleButton";

const Auth = () => {
    const [login, setLogin] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [errorCardVisible, setErrorCardVisible] = useState(false)
    const [{manager}, appDispatch] = useAppContext()
    const {data: managerData, error: managerError, loading: managerLoading, fetchData: managerFetch} = useFetch()
    const user = useAuth()

    useEffect(async () => {
        setLoading(true)
        try {
            if (user && !managerData) {
                await managerFetch('getManagerByUid', user.uid)
            }
            if (managerData && !manager && user) {
                appDispatch({type: 'setManager', payload: managerData})
            }
        } catch (error) {
            setError(error)
            setErrorCardVisible(true)
        }
        if (error) {
            console.error(error)
            setTimeout(() => {
                setErrorCardVisible(false)
                setError(null)
            }, 2000)
        }
        setLoading(false)
    }, [user, managerData, error])

    const handleAuth = async (e, type) => {
        e.preventDefault()
        setLoading(true)
        try {
            switch (type) {
                case 'login':
                    await signInWithEmailPassword(login, password)
                    break
                case 'logout':
                    await logOut()
                    break
                case 'signup':
                    await createUserWithEmailPassword(login, password)
                    break
                case 'loginWithGoogle':
                    await signInWithGoogle()
                    break
            }
        } catch (error) {
            setError(error.message)
            setErrorCardVisible(true)
        }
        setLoading(false)
    }

    if (manager) {
        return <Navigate to={'/dashboard'}/>
    }

    return (
        <section className='container'>
            <form className='auth-card col-center gap-24'
                  onSubmit={(e) => handleAuth(e, 'login')}>

                <CSSTransition in={errorCardVisible} timeout={500}
                               classNames="auth-card-error-animation" unmountOnExit>
                    <ErrorAuthCard error={error}/>
                </CSSTransition>

                <Logo/>

                <div className='col-center gap-12'>
                    <div className='auth-card-input-wrapper'>
                        <input onChange={(e) => setLogin(e.target.value)} type='text'
                               className='auth-card-input' placeholder='Login' autoComplete='username'/>
                    </div>
                    <div className='auth-card-input-wrapper'>
                        <input onChange={(e) => setPassword(e.target.value)} type="password"
                               className='auth-card-input' placeholder='Password' autoComplete='current-password'/>
                    </div>
                </div>
                <Button isLoading={loading} disabled={loading || user} buttonText={'Log in'} onClickFunc={(e) => handleAuth(e, 'login')}/>
                <p onClick={(e) => handleAuth(e, 'signup')} className='text-label auth-card-singup'>sing up</p>
                <GoogleButton handleClick={handleAuth}/>
            </form>
        </section>
    )
}

export default Auth

const ErrorAuthCard = ({error}) => {
    let errorMessage = error?.split('/')
    if (errorMessage?.length > 1) {
        errorMessage = errorMessage[1].replaceAll('-', ' ')
        errorMessage = errorMessage.substr(0, errorMessage?.length - 2)
        errorMessage = errorMessage[0].toUpperCase() + errorMessage.substr(1)
    }

    return (
        <div className='auth-card-error'>{errorMessage && `Authentication failed: ${errorMessage}`}</div>
    )

}
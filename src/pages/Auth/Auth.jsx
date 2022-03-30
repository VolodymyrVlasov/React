import Logo from "../../components/Logo/Logo";
import {useAppContext} from "../../hooks/useAppContext";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/Button/Button";
import {CSSTransition} from "react-transition-group";
import AuthProviderButton from "../../components/AuthProviderButton/AuthProviderButton";
import {useAuth} from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";

import "./Auth.css"

const Auth = () => {
    const {data: managerData, error: managerError, loading: managerLoading, fetchData: managerFetch} = useFetch()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errorCardVisible, setErrorCardVisible] = useState(false)
    const [{manager}, appDispatch] = useAppContext()
    const {
        user,
        loading,
        error,
        signInWithGoogle,
        signUp,
        signIn,
        signInWithFacebook,
        getOAuth,
        signInWithGithub
    } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        getOAuth()
    }, [])

    useEffect(async () => {
        let errorCardAnimationTimer

        if (user && !managerData) {
            await managerFetch('getManagerByUid', user.uid)
        }
        if (managerData && !manager && user) {
            appDispatch({type: 'setManager', payload: managerData})
        }
        if (manager) {
            navigate("/orders", {replace: true})
        }
        if (error) {
            setErrorCardVisible(true)
            errorCardAnimationTimer = setTimeout(() => {
                setErrorCardVisible(false)
            }, 2000)
        }

        return () => {
            clearTimeout(errorCardAnimationTimer)
        }
    }, [user, managerData, manager, error])

    if (loading) {
        return <Loading/>
    }

    return (
        <section className='container'>
            <div className="auth-card col-center gap-24">
                <form className='col-center gap-24'
                      onSubmit={(e) => signIn(login, password)}>

                    <CSSTransition in={errorCardVisible} timeout={500}
                                   classNames="auth-card-error-animation" unmountOnExit>
                        <ErrorAuthCard error={error}/>
                    </CSSTransition>

                    <Logo/>

                    <div className='col-center gap-12'>
                        <div className='auth-card-input-wrapper'>
                            <input onChange={(e) => setLogin(e.target.value)}
                                   type='text'
                                   value={login}
                                   className='auth-card-input'
                                   placeholder='Login'
                                   autoComplete='username'
                            />
                        </div>
                        <div className='auth-card-input-wrapper'>
                            <input onChange={(e) => setPassword(e.target.value)}
                                   type="password"
                                   value={password}
                                   className='auth-card-input'
                                   placeholder='Password'
                                   autoComplete='current-password'/>
                        </div>
                    </div>
                    <Button isLoading={loading || errorCardVisible}
                            disabled={loading || errorCardVisible}
                            buttonText={"Log in"}
                            buttonType={"submit"}
                            onClickFunc={() => signIn(login, password)}
                    />
                    <p onClick={(e) => signUp(login, password)}
                       className='text-label auth-card-singup'>sing up</p>
                </form>
                <div className="col-center gap-8 full-width">
                    <AuthProviderButton handleClick={signInWithGoogle}/>
                    <AuthProviderButton handleClick={signInWithFacebook} type={"facebook"}/>
                    <AuthProviderButton handleClick={signInWithGithub} type={"github"}/>
                </div>
            </div>
        </section>
    )
}

export default Auth

const ErrorAuthCard = ({error}) => {
    // let errorMessage = error?.split('/')
    // if (errorMessage?.length > 1) {
    //     errorMessage = errorMessage[1].replaceAll('-', ' ')
    //     errorMessage = errorMessage.substr(0, errorMessage?.length - 2)
    //     errorMessage = errorMessage[0].toUpperCase() + errorMessage.substr(1)
    // }

    return (
        <div className='auth-card-error'>{error && `Authentication failed: ${error}`}</div>
    )

}
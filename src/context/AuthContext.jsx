import {auth} from "../utils/firebase";
import {GithubAuthProvider} from "@firebase/auth";
import {createContext, useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getRedirectResult,
    GoogleAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithRedirect,
    signOut as signAuthOut
} from 'firebase/auth';

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const authData = useAuthProvider()
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
}

const useAuthProvider = () => {
    const [error, setError] = useState(JSON.parse(localStorage.getItem("user")))
    const [loading, setLoading] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        }
        if (!user && auth.currentUser) {
            const usr = JSON.parse(localStorage.getItem("user"))
            setUser(usr)
        }
    }, [user])

    const signIn = (email, password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user)
                setError(null)
            })
            .catch(error => {
                setError({message: error.message})
                setUser(null)
            })
            .finally(() => setLoading(false))
    }

    const signUp = (email, password) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user)
                setError(null)
            })
            .catch(error => {
                console.error(error.code, error.message)
                setError({message: error.message})
                setUser(null)
            })
            .finally(() => setLoading(false))
    }

    const signOut = () => {
        setLoading(true)
        signAuthOut(auth)
            .then(() => {
                setUser(null)
                setError(null)
                localStorage.removeItem("user")
            })
            .catch(error => {
                setError({message: error.message})
                setUser(null)
            })
            .finally(() => setLoading(false))
    }

    const verificationByEmail = () => {
        setLoading(true)
        sendEmailVerification(auth.currentUser)
            .then(() => console.log('verification was sent'))
            .catch(() => setError({message: error.message}))
            .finally(() => setLoading(false))
    }

    const resetPasswordByEmail = (email) => {
        setLoading(true)
        sendPasswordResetEmail(auth, email)
            .then(() => console.log('reset passwd form was sent'))
            .catch(error => setError({message: error.message}))
            .finally(() => setLoading(false))
    }

    const deleteUserAccount = () => {
        console.error("Function not implemented")
    }

    const signInWithGoogle = async () => {
        setLoading(true)
        await signInWithRedirect(auth, new GoogleAuthProvider())
    }

    const signInWithFacebook = () => {
        setLoading(true)
        signInWithRedirect(auth, new FacebookAuthProvider())
            .then(userCredential => {
                setUser(userCredential.user)
                setError(null)
            })
            .catch((error) => {
                console.log(error)
                // setError({message: error.message})
            })
            .finally(() => setLoading(null))
    }

    const signInWithGithub = async () => {
        setLoading(true)
        await signInWithRedirect(auth, new GithubAuthProvider())
    }

    const getOAuth = () => {
        setLoading(true)

        getRedirectResult(auth)
            .then((result) => {
                setUser(result?.user)
                setError(null)
            })
            .catch((error) => {
                if (error !== undefined) {
                    setError({code: error.code, message: error.message})
                    setUser(null)
                }
            })
            .finally(() => setLoading(false))
    }

    return {
        user,
        error,
        loading,
        signIn,
        signUp,
        signOut,
        verificationByEmail,
        resetPasswordByEmail,
        deleteUserAccount,
        signInWithFacebook,
        signInWithGoogle,
        signInWithGithub,
        getOAuth
    }
}



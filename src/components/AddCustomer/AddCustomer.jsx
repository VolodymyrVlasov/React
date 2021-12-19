import "./AddCustomer.css"
import {createRef, useEffect, useState} from "react";

const AddCustomer = ({addCustomer}) => {
    const [name, setName] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)

    const nameRef = createRef()
    const lastnameRef = createRef()
    const phoneRef = createRef()
    const emailRef = createRef()
    let delayTimer

    useEffect(() => {
            if ((name && lastname) && (phone || email)) {
                addCustomer({name, lastname, phone, email})
            }
        },
        [name, lastname, phone, email])

    const validateEmail = (email) => {
        const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.match(regExp)
    }

    const validatePhone = (phone) => {
        const regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phone.match(regExp)
    }

    const addToState = ({data, type}) => {
        clearTimeout(delayTimer)
        delayTimer = setTimeout(() => {
            if (data !== "") {
                switch (type) {
                    case "name":
                        setName(data)
                        break
                    case "lastname":
                        setLastname(data)
                        break
                    case "phone":
                        setPhone(data)
                        break
                    case "email":
                        setEmail(data)
                        break
                }
            }
        }, 500)
    }

    const addName = () => {
        let data = nameRef.current.value.trim()
        if (data.split("\s").length > 1) {
            data = data.split(" ")[0]
        }
        let newName = data.substring(0, 1).toUpperCase() + data.substring(1)
        nameRef.current.value = newName
        addToState({data: newName, type: "name"})
    }

    const addLastname = () => {
        let data = lastnameRef.current.value.trim()
        if (data.split("\s").length > 1) {
            data = data.split(" ")[0]
        }
        let newName = data.substring(0, 1).toUpperCase() + data.substring(1)
        lastnameRef.current.value = newName
        addToState({data: newName, type: "lastname"})
    }

    const addPhone = () => {
        let phone = phoneRef.current.value.trim()
        if (validatePhone(phone)) {
            phoneRef.current.style.border = "1px solid green"
            //todo: format phone string
            addToState({data: phone, type: "phone"})
        } else {
            phoneRef.current.style.border = "1px solid red"
        }
    }

    const addEmail = () => {
        let email = emailRef.current.value.trim()
        if (validateEmail(email)) {
            emailRef.current.style.border = "1px solid green"
            addToState({data: email, type: "email"})
        } else {
            emailRef.current.style.border = "1px solid red"
        }
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <input ref={nameRef} type="text" placeholder="Name" onInput={() => addName()}/>
            <input ref={lastnameRef} type="text" placeholder="Lastname" onInput={() => addLastname()}/>
            <input ref={phoneRef} type="tel" placeholder="Phone" pattern="[0-9] {3} - [0-9] {2} - [0-9] {3}"
                   onInput={() => addPhone()}/>
            <input ref={emailRef} type="email" placeholder="e-mail" onInput={() => addEmail()}/>
            <button>x</button>
        </>
    )
}

export default AddCustomer
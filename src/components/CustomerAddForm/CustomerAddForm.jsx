import "./CustomerAddForm.css"
import {createRef, useEffect, useState} from "react";
import Button from "../Button/Button";

const CustomerAddForm = ({addCustomer, setIsNewCustomer}) => {
    const [isBtnAdd, setIsBtnAdd] = useState(false)
    const [name, setName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)

    const nameRef = createRef()
    const lastnameRef = createRef()
    const phoneRef = createRef()
    const emailRef = createRef()
    let delayTimer

    useEffect(() => {
            if (isBtnAdd) {
                if ((name && lastName) && (phone || email)) {
                    addCustomer({name,lastName, phone, email})
                } else {
                    if (!name) {
                        nameRef.current.style.border = "1px solid red"
                    } else {
                        lastnameRef.current.style.border = "1px solid var(--color-text-gray)"
                    }
                    if (!lastName) {
                        lastnameRef.current.style.border = "1px solid red"
                    } else {
                        lastnameRef.current.style.border = "1px solid var(--color-text-gray)"
                    }
                    if (!phone) {
                        phoneRef.current.style.border = "1px solid red"
                    } else {
                        lastnameRef.current.style.border = "1px solid var(--color-text-gray)"
                    }
                    if (!email) {
                        emailRef.current.style.border = "1px solid red"
                    } else {
                        lastnameRef.current.style.border = "1px solid var(--color-text-gray)"
                    }
                }
            }
    }, [isBtnAdd])

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
                    case "lastName":
                        setLastName(data)
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
        addToState({data: newName, type: "lastName"})
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

    return (
        <>
            <input ref={nameRef} type="text" placeholder="Name" className="add_customer-input"
                   onInput={() => addName()}/>
            <input ref={lastnameRef} type="text" placeholder="Lastname" className="add_customer-input"
                   onInput={() => addLastname()}/>
            <input ref={phoneRef} type="tel" placeholder="Phone" pattern="[0-9] {3} - [0-9] {2} - [0-9] {3}"
                   onInput={() => addPhone()} className="add_customer-input"/>
            <input ref={emailRef} type="email" placeholder="e-mail" className="add_customer-input"
                   onInput={() => addEmail()}/>
            <button onClick={() => setIsNewCustomer(false)} className="add_customer-cancel_button">+</button>
            <Button onClickFunc={() => setIsBtnAdd(true)} buttonText={"Add"}/>
        </>
    )
}

export default CustomerAddForm
import "./CustomerAddForm.css"
import {createRef, useEffect, useState} from "react";
import Button from "../Button/Button";

const CustomerAddForm = ({addCustomer, setIsNewCustomer, isLoading = false}) => {
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

    const createCustomer = (e) => {
        e.preventDefault()
        setIsBtnAdd(true)
    }

    useEffect(() => {
        nameRef.current.focus()

    }, [])


    const [styleName, setStyleName] = useState("flex-1")
    const [styleLastName, setStyleLastName] = useState("")
    const [stylePhone, setStylePhone] = useState("")
    const [styleEmail, setStyleEmail] = useState("")

    const onfocus = (e) => {
        if (e.target.name === "name") {
            setStyleName("flex-1")
            setStyleLastName("")
            setStylePhone("")
            setStyleEmail("")
        }
        if (e.target.name === "lastName") {
            setStyleName("")
            setStyleLastName("flex-1")
            setStylePhone("")
            setStyleEmail("")
        }
        if (e.target.name === "phone") {
            setStyleName("")
            setStyleLastName("")
            setStylePhone("flex-1")
            setStyleEmail("")
        }
        if (e.target.name === "email") {
            setStyleName("")
            setStyleLastName("")
            setStylePhone("")
            setStyleEmail("flex-1")
        }
    }

    return (
        <form
            onSubmit={(e) => createCustomer(e)}
            className={"add-customer-wrapper row-vertical-center gap-24 full-width"}>
            <div className="row-left gap-8 full-width">
                <input ref={nameRef}
                       type="text"
                       name={"name"}
                       placeholder="Name"
                       className={`add-customer-input ${styleName}`}
                       onInput={() => addName()}
                       onFocus={(e) => onfocus(e)}
                />
                <input ref={lastnameRef}
                       type="text"
                       name={"lastName"}
                       placeholder="Lastname"
                       className={`add-customer-input ${styleLastName}`}
                       onInput={() => addLastname()}
                       onFocus={(e) => onfocus(e)}
                />
                <input ref={phoneRef}
                       type="tel"
                       name={"phone"}
                       placeholder="Phone"
                       className={`add-customer-input ${stylePhone}`}
                       pattern="[0-9] {3} - [0-9] {2} - [0-9] {3}"
                       onInput={() => addPhone()}
                       onFocus={(e) => onfocus(e)}
                />
                <input ref={emailRef}
                       type="email"
                       name={"email"}
                       placeholder="e-mail"
                       className={`add-customer-input ${styleEmail}`}
                       onInput={() => addEmail()}
                       onFocus={(e) => onfocus(e)}
                />
            </div>
            <div className="row-right gap-24">
                <Button onClickFunc={(e) => createCustomer(e)} isLoading={isLoading} buttonText={"Create"}/>
                <Button onClickFunc={() => setIsNewCustomer(false)} type={"cancel"}/>
            </div>
        </form>
    )
}

export default CustomerAddForm
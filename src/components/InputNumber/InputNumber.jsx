import {createRef, useEffect, useState} from "react";
import Button from "../Button/Button";
import "./InputNumber.css"
import InputWrapper from "../InputWrapper/InputWrapper";

const InputNumber = ({onChangeCallback, min = 1, max = 100000, step = 1, valueSate, label}) => {
    const ref = createRef()

    const onMinusClick = () => {
        if (ref.current.value > min) {
            onChangeValue(valueSate -= step)
        }
    }

    const onPlusClick = () => {
        if (ref.current.value < max) {
            onChangeValue(valueSate += step)
        }
    }

    const onChangeValue = (value) => {
        onChangeCallback(value)
        if (value === 0) {
            onChangeValue(1)
        }
    }

    useEffect(() => {
        if (ref?.current?.value === 0) {
            ref.current.value = 1
        }
    }, [valueSate])

    return (
       <InputWrapper label={label}>
            <Button type={"minus"} onClickFunc={onMinusClick}/>
            <input ref={ref} className={"input_number-input"}
                   name={label ? label : "input-number"}
                   type="number" min={min} max={max} step={step} value={valueSate}
                   onChange={(event) => onChangeValue(event?.target?.value)}
            />
            <Button type={"plus"} onClickFunc={onPlusClick}/>
       </InputWrapper>
    )
}

export default InputNumber




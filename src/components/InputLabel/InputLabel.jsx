import styles from "./InputLabel.module.css"

const InputLabel = ({callback, value, inputType = "text", min, max, step}) => {

    return (
        <div className={styles.input_label_cnt}>
            <input type={inputType}
                   value={value}
                   min={min && `${min}`}
                   max={max && `${max}`}
                   step={step && `${step}`}
                   onChange={e => callback(e.target.value)}
                   className={styles.input_label_label}
            />
        </div>
    )
}

export default InputLabel
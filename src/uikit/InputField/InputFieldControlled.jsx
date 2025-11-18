import { useId, useState } from "react"

const InputFieldControlled = ({name, type, label}) => {
    const id = useId()

    const [state, setState] = useState('')

    const handleChange = (ev) => {
        setState(ev.currentTarget.value)
    }

    return (
        <>
            <div>
                <label htmlFor={id}>{label}</label>
                <input id={id} name={name} type={type} value={state} onChange={handleChange} />
            </div>
        </>
    )
}

export default InputFieldControlled

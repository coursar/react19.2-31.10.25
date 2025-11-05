import { useId } from "react"

const InputField = ({name, type, label}) => {
    const id = useId()

    return (
        <>
            <div>
                <label htmlFor={id}>{label}</label>
                <input id={id} name={name} type={type} />
            </div>
        </>
    )
}

export default InputField

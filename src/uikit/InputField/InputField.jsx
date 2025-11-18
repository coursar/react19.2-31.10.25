import { forwardRef, useId } from "react"

// React18
// const InputField = forwardRef(({name, type, label, onChange}, ref) => {
//     const id = useId()

//     const handleChange = (ev) => {
//         onChange?.(ev)
//     }

//     return (
//         <>
//             <div>
//                 <label htmlFor={id}>{label}</label>
//                 <input ref={ref} id={id} name={name} type={type} onChange={handleChange} />
//             </div>
//         </>
//     )
// })

const InputField = ({name, type, label, onChange, ref}) => {
    const id = useId()

    const handleChange = (ev) => {
        onChange?.(ev)
    }

    return (
        <>
            <div>
                <label htmlFor={id}>{label}</label>
                <input ref={ref} id={id} name={name} type={type} onChange={handleChange} />
            </div>
        </>
    )
}

export default InputField

// useState
// useEffect
import { useState } from "react"
import InputField from "../uikit/InputField/InputField"

// useId (React18)
const MessageForm = ({ onSubmit, disabled }) => {
    const [toggle, setToggle] = useState(true)

    /**
     * 
     * @param {SubmitEvent} ev 
     */
    const handleSubmit = (ev) => {
        onSubmit(ev) // TODO: library
    }

    const handleToggle = () => {
        setToggle(prev => !prev)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={disabled}>
                    <InputField name="data" type="text" label="Message Text:" />
                    <InputField name="image" type="file" label="Select Photo:" />
                    <button>Save</button>
                </fieldset>
            </form>
            <button onClick={handleToggle}>toggle</button>
        </>
    )
}

export default MessageForm

// useState
// useEffect
import { useRef, useState } from "react"
import InputField from "../uikit/InputField/InputField"
import InputFieldControlled from "../uikit/InputField/InputFieldControlled"

// useId (React18)
const MessageForm = ({ onSubmit, disabled }) => {
    const fileRef = useRef(null)
    /**
     * 
     * @param {SubmitEvent} ev 
     */
    const handleSubmit = async (ev) => {
        const { currentTarget } = ev
        // for text data
        // const elements = Array.from(currentTarget.elements)
        //     .filter(o => o.name !== '')
        //     .map(o => {
        //         if (o.type === 'text') {
        //             return ['text', o.name, o.value]
        //         }
        //         if (o.type === 'file') {
        //             return ['file', o.name, o.files]
        //         }

        //         ///
        //     })

        // const formData = new FormData(ev.currentTarget)
        // // multipart/form-data
        // const response = await fetch('http://localhost:9999/api/test/form-multipart', {
        //     method: 'POST',
        //     body: formData
        // })
        // const data = await response.json()

        // const formData = new FormData(ev.currentTarget)
        // GET/POST
        // queryParams (encoded)
        // application/x-www-url-formencoded
        // const params = new URLSearchParams(formData)

        // const response = await fetch('http://localhost:9999/api/test/blob', {
        //     method: 'POST',
        //     body: fileRef.current.files[0] // File -> Blob
        // })
        // const data = await response.json()

        onSubmit(ev) // TODO: library

        // for controlled: send from state
        // for uncontrolled:
        // 1. use refs (for small count of fields)
        // 2. Native (DOM) API:
        // 2.1. Form elements 
        // 2.2. FormData
    }

    const handleTextChange = (ev) => {
        // TODO: form validation
        console.log('text', ev)
    }

    const handleFileChange = (ev) => {
        console.log('file', ev)
        // sometimes later
        // ev.currentTarget.value = ''
    }

    const handleFileSelect = (ev) => {
        fileRef.current.click()
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={disabled}>
                    <InputField name="data" type="text" label="Message Text:" onChange={handleTextChange} />
                    <InputField ref={fileRef} name="image" type="file" label="Select Photo:" onChange={handleFileChange} />
                    <button type="button" onClick={handleFileSelect}>Select File</button>
                    <button>Save</button>
                </fieldset>
            </form>
        </>
    )
}

export default MessageForm

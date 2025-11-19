import { useState } from "react"

const Children = () => {
    const [state, setState] = useState(0)

    const handleClick = () => {
        setState(prev => prev + 1)
    }

    return (
        <>
            <Parent>
                <Child></Child>
            </Parent>
            <button onClick={handleClick}>Click Children</button>
        </>
    )
}

const Parent = ({children}) => {
    const [state, setState] = useState(0)

    const handleClick = () => {
        setState(prev => prev + 1)
    }

    return (
        <>
            {children}
            <button onClick={handleClick}>Click Parent</button>
        </>
    )
}

const Child = () => {
    return (
        <>
            Child
        </>
    )
}

export default Children
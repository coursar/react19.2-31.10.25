import { useEffect, useState } from "react"

const StateDebugQueue = () => {
    debugger
    const [state, setState] = useState(0)

    useEffect(() => {
        // React 18+ 
        setTimeout(() => {
            setState(1)
            setState(2)
        }, 10_000)
    }, [])

    return (
        <>
            {state}
        </>
    )
}

export default StateDebugQueue

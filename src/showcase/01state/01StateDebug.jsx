import { useEffect, useState } from "react"

const StateDebug = () => {
    debugger

    const [state, setState] = useState(0) // [1, setState]

    useEffect(() => {
        setTimeout(() => setState(1), 30_000)
    }, [])

    return (
        <>
            {state}
        </>
    )
}

export default StateDebug

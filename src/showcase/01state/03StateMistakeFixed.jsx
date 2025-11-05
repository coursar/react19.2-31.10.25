import { useEffect, useState } from "react"

const StateMistakeFixed = () => {
    const [state, setState] = useState(0)

    const handleClick = () => {
        setState(prev => prev + 1)
        // Promise, setTimeout, etc
        setState(prev => prev + 1)
    }

    return (
        <>
            {state}
            <button onClick={handleClick}>Inc</button>
        </>
    )
}

export default StateMistakeFixed

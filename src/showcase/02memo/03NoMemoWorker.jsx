import { useState, memo, useMemo, useCallback, useEffect } from "react"

// [data] -> filter -> reducing (sum, agg)
// big DOM



const NoMemoWorker = () => {
    const [value, setValue] = useState(1)
    const [counter, setCounter] = useState(0)

    // 1. render -> call fn -> save {value: 1}
    // 2. re-render (if value not changed) -> ignore fn & return object from step 1.
    return (
        <>
            <button onClick={() => setValue(prev => prev + 1)}>value: {value}</button>
            <button onClick={() => setCounter(prev => prev + 1)}>counter: {counter}</button>
            <div>
                <Child />
            </div>
        </>
    )
}

export default NoMemoWorker

// Solution:
// 1. Memo (React) <-
// 2. Worker (Dedicated/Shared)
// 3. Split Work

const Child = ({}) => {
    const [currentCount, setCurrentCount] = useState(0)

    // reason: hard work (render)
    // generation 10000
    useEffect(() => {
        const worker = new Worker(new URL('./Worker.mjs', import.meta.url), {
            type: 'module'
        })
        worker.addEventListener('message', (ev) => {
            setCurrentCount(ev.data.result)
        })

        worker.postMessage({
            task: 'count' // ignored now
        })

        return () => worker.terminate()
    }, [])

    return (
        <>{currentCount}</>
    )
}

import { useState, memo, useMemo, useCallback } from "react"

// [data] -> filter -> reducing (sum, agg)
// big DOM
const work = (duration) => {
    const start = Date.now() // epoch ms
    const end = start + duration
    let current = start
    while (current < end) {
        current = Date.now()
    }
    return 'ok' // result of our work
}



const MemoWork = () => {
    const [value, setValue] = useState(1)
    const [counter, setCounter] = useState(0)

    // 1. render -> call fn -> save {value: 1}
    // 2. re-render (if value not changed) -> ignore fn & return object from step 1.
    const object = useMemo(() => ({value}), [value]) // useMemo

    // const handleSomethingHappened = useMemo(() => () => { console.log('callback called') }, [])
    const handleSomethingHappened = useCallback(() => { console.log('callback called') }, [])

    return (
        <>
            <button onClick={() => setValue(prev => prev + 1)}>value: {value}</button>
            <button onClick={() => setCounter(prev => prev + 1)}>counter: {counter}</button>
            <div>
                <Child object={object} onSomethingHappened={handleSomethingHappened} />
            </div>
        </>
    )
}

export default MemoWork

// Solution:
// 0. Server calculations
// 1. Memo (React) <-
// 2. Split Work
// 3. Worker (Dedicated/Shared)

const Child = memo(({object, onSomethingHappened}) => {
    // reason: hard work (render)
    // generation 10000
    const result = work(object.value * 1000)

    return (
        <>{result}</>
    )
})

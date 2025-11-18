import { memo, useEffect } from "react";

const work = (duration) => {
    const start = Date.now() // epoch ms
    const end = start + duration
    let current = start
    while (current < end) {
        current = Date.now()
    }
    return 'ok' // result of our work
}


// after performance testing
const MessagesStats = memo(({items}) => {
    // calculate stats
    const stats = work(1000)
    // useEffect(() => {
    //     work(10000)
    // }, [])

    return (
        <>
            {stats}
        </>
    )
})

export default MessagesStats
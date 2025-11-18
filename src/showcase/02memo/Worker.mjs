// 1. Dedicated Worker

const work = () => {
    let globalCount = 0
    for (let i = 0; i < 10_000_000_000; i++) {
        if (i % 10_000_000 === 0) {
            globalThis.postMessage({
                result: globalCount 
            })
        }

        globalCount++
    }
    return globalCount
}

// scope -> DOM, limited API

// self
globalThis.addEventListener('message', (ev) => {
    const result = work()
    globalThis.postMessage({
        result 
    })
})

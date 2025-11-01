// Component ->
//  - JSX -> React.Element
//  - string, ..., undefined

import { useEffect } from "react"

// TODO: top mistakes for return
//  1. omit return
//  2. multiple JSX elements
//  3. return + EOL => return; => return undefined;
// SOLUTION => return (<> ... </>)
const App = () => {
  // React.Fragment -> container, doesn't create any DOM

  // TODO: top mistakes inside component
  // 1. write function to get data (Suspense + Data Fetching)

  // Hooks -> use+, (API - not hook use())
  // Lifecycle:
  // 1. Mount -> creation + adding "to page"
  useEffect(() => {
    // Promise -> Future/CompletableFuture
    // pending -> fulfilled (success)
    //         -> rejected (error)

    // API:
    //  1. Promise -> only one result: 0-1
    //  1.1. method => .then, .catch, .finally
    //  1.2. async, await => function colors
    //  2. Events -> multiple results: 0+
    const request = async () => {
      try {
        // TODO:
        // 1. Vanilla JS -> fulfilled with any HTTP Response (2xx 4xx, 5xx)
        // 2. Third-Party -> fulfilled with any 2xx, reject - 4xx, 5xx
        const resp = await fetch('http://localhost:9999/api/test/poll')
        if (!resp.ok) { // 2xx
          throw new Error('bad response')
        }
        const data = await resp.json()
      } catch (e) {
        console.warn(e)
      }
    }

    request()

  }, []) // [] - executes "on mount" (after mount) - dependencies

  return (
    <>
      Messages
    </>
  )
}

export default App

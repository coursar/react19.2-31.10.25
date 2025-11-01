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
    console.log('after mount')
  }, []) // [] - executes "on mount" (after mount) - dependencies

  return (
    <>
      Messages
    </>
  )
}

export default App

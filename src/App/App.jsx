// Component ->
//  - JSX -> React.Element
//  - string, ..., undefined

import { useState } from "react"
import Messages from "../Messages/Messages"


// 1. Slow -> Progress
// 2. Error Handling -> Retry
const App = () => {
  return (
    <>
      {<Messages/>}
    </>
  )
}

export default App

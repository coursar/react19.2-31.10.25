// Component ->
//  - JSX -> React.Element
//  - string, ..., undefined

import { useState } from "react"
import Messages from "../Messages/Messages"


// 1. Slow -> Progress
// 2. Error Handling -> Retry
const App = () => {
  const [show, setShow] = useState(true)

  const handleClick = () => {
    setShow(prev => !prev)
  }

  return (
    <>
      <button onClick={handleClick}>Toggle</button>
      {show && <Messages/>}
    </>
  )
}

export default App

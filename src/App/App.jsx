// Component ->
//  - JSX -> React.Element
//  - string, ..., undefined

import { useEffect, useState } from "react"
import Message from "../Message/Message"

// 1. Slow -> Progress
// 2. Error Handling -> Retry
const App = () => {
  const [data, setData] = useState([])
  const [isPending, setPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const request = async () => {
      setPending(true)
      setError(null)
      try {
        const resp = await fetch('http://localhost:9999/api/test/poll')
        if (!resp.ok) { // 2xx
          throw new Error('bad response')
        }
        const data = await resp.json()
        setData(data)
      } catch (e) {
        console.warn(e)
        setError(e)
      } finally {
        setPending(false)
      }
    }

    request()
  }, [])

  if (isPending) {
    return (
      <>
        Loading...
      </>
    )
  }

  if (error) { // 0, null, undefined, false, ... -> falsy
    return (
      <>
        {error.message}
      </>
    ) 
  }

  // browser: Event, React -> Synthetic Event
  // ev: default action -> load
  /**
   * 
   * @param {SubmitEvent} ev 
   */
  const handleSubmit = async (ev) => {
    ev.preventDefault()

    // data = message (id generated on server)
    const data = ev.currentTarget.elements.data.value
    const params = new URLSearchParams({data: data}) // ?data=message

    setPending(true)
    setError(null)

    try {
      const resp = await fetch(`http://localhost:9999/api/test/message?${params.toString()}`)
      if (!resp.ok) { // 2xx
        throw new Error('bad response')
      }
      const data = await resp.json()
      setData(data)
    } catch (e) {
      console.warn(e)
      setError(e)
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      {/* action="URL" method="GET" enctype="" => GET URL?data=URLEncoded(...) */}
      <form onSubmit={handleSubmit}>
        <div>
          <input name="data" type="text" />
        </div>
        {/* HTML Specification => type="submit" */}
        <button>Save</button>
      </form>
      Messages
      {data.map(o => 
        <Message key={o.id} message={o.data}></Message>
      )}
    </>
  )
}

export default App

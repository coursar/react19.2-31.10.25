import { useEffect, useState } from "react"
import Message from "../Message/Message"
import MessageList from "../MessageList/MessageList"
import MessageForm from "../MessageForm/MessageForm"

// FIXME: make updates
const Messages = () => {
  const [messages, setMessages] = useState([])
  const [isPending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const [backgroundUpdate, setBackgroundUpdate] = useState(false)

  // initial data load -> interactive
  useEffect(() => {
    const request = async () => {
      setPending(true)
      setError(null)
      try {
        const resp = await fetch('http://localhost:9999/api/test/poll')
        // TODO: AbortController
        if (!resp.ok) { // 2xx
          throw new Error('bad response')
        }
        const data = await resp.json()
        setMessages(data)
        setBackgroundUpdate(true)
      } catch (e) {
        console.warn(e)
        setError(e)
      } finally {
        setPending(false)
      }
    }

    request()
  }, []) // [] -> 1 render, on next render [] not changed => not executed

  // background update -> non-interactive 
  // 3 render - not executed (because flag not changed)
  useEffect(() => {
    if (!backgroundUpdate) {
        // 1 render -> exit here
        return
    }
    // 2 render

    let lastSeenId = 0
    let timeoutId = null
    let canceled = false
    const poll = async () => {
      try {
        const resp = await fetch(`http://localhost:9999/api/test/poll?lastSeenId=${lastSeenId}`)
        if (!resp.ok) { // 2xx
          throw new Error('bad response')
        }
        const data = await resp.json()
        lastSeenId = data.at(-1)?.id || lastSeenId
        // not mutate
        // [messages[0], messages[1], ..., data[0], data[1]]
        setMessages(prev => [...prev, ...data])
        // Object.is => setState(object) => React ref comparsion => Java ref1 == ref2
        // messages.push(a, b, c)
        // messages.push(...[a, b, c])
      } catch (e) {
        console.warn(e)
      } finally {
        if (canceled) {
          return
        }
        timeoutId = setTimeout(poll, 5_000)
      }
    }
    timeoutId = setTimeout(poll, 5_000)

    // effect clean
    return () => {
      canceled = true
      clearTimeout(timeoutId) // cancel next invocation
    }
  }, [backgroundUpdate]) // Object.is -> ref, === primitive

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
      // HW: no data -> make other request
      //     slow response
      const data = await resp.json()
      setMessages(data)
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
      <MessageForm disabled={isPending} onSubmit={handleSubmit} />
      <MessageList isPending={isPending} items={messages} />
    </>
  )
}

export default Messages
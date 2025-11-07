import { useEffect, useRef, useState } from "react"
import Message from "../Message/Message"
import MessageList from "../MessageList/MessageList"
import MessageForm from "../MessageForm/MessageForm"

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [isPending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const [backgroundUpdate, setBackgroundUpdate] = useState(false)
  const lastSeenIdRef = useRef(0) // lastSeenIdRef = { .current: 0 }

  // TODO:
  // state -> triggered rerender on change
  // ref -> not triggered rerender on change | 50%
  // effect -> multiple effect, deps: [], [backgroundUpdate], effect cleanup


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
        lastSeenIdRef.current = data.at(-1) || lastSeenIdRef.current
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

    let timeoutId = null
    let canceled = false
    const longPoll = async () => {
        try {
            const resp = await fetch(`http://localhost:9999/api/test/long-poll?lastSeenId=${lastSeenId.current}`)
            if (!resp.ok) { // 2xx
                throw new Error('bad response')
            }
            const data = await resp.json()
            setMessages(prev => [...prev, ...data])
            lastSeenIdRef.current = data.at(-1) || lastSeenIdRef.current
            if (!canceled) {
                timeoutId = setTimeout(longPoll, 0)
            }
        } catch (e) {
            console.warn(e)
            if (!canceled) {
                timeoutId = setTimeout(longPoll, 10_000)
            }
        }
    }
    longPoll()

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
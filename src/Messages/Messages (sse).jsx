import { useEffect, useRef, useState } from "react"
import Message from "../Message/Message"
import MessageList from "../MessageList/MessageList"
import MessageForm from "../MessageForm/MessageForm"

const Messages = () => {
    const [messages, setMessages] = useState([])
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState(null)

    // initial loading + background update => single object for both actions
    useEffect(() => {
        let initialLoading = true
        setPending(true)
        setError(null)

        const sse = new EventSource(`http://localhost:9999/api/test/sse`)
        // removeEventListener('message', sameFn)
        // .onmessage
        sse.addEventListener('message', ev => {
            try {
                const data = JSON.parse(ev.data)
                setMessages(prev => [...prev, ...data])
                if (initialLoading) {
                    setError(null)
                }
            } catch (e) {
                console.warn(e)
                if (initialLoading) {
                    setError(e)
                }
            } finally {
                if (initialLoading) {
                    initialLoading = false
                    setPending(false)
                }
            }
        })

        return () => sse.close()
    }, [])


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
        const params = new URLSearchParams({ data: data }) // ?data=message

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
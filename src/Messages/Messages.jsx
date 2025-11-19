import { useEffect, useRef, useState } from "react"
import Message from "../Message/Message"
import MessageList from "../MessageList/MessageList"
import MessageForm from "../MessageForm/MessageForm"
import MessagesStats from "../MessagesStats/MessagesStats"

// useState
// useEffect
// useRef - 60%, ref -> DOM Element
const Messages = () => {
    const [messages, setMessages] = useState([])
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState(null)
    const [counter, setCounter] = useState(1)
    const wsRef = useRef(null)

    // initial loading + background update => single object for both actions
    useEffect(() => {
        let lastSeenId = 0
        wsRef.current = new WebSocket(`ws://localhost:9999?lastSeenId=${lastSeenId}`)

        wsRef.current.addEventListener('open', (ev) => { })

        wsRef.current.addEventListener('error', (ev) => {})

        wsRef.current.addEventListener('close', (ev) => {
            setTimeout(() => {
                wsRef.current = new WebSocket(`ws://localhost:9999?lastSeenId=${lastSeenId}`)
            }, 10_000)
        })

        // wsRef.current.binaryType = ''

        wsRef.current.addEventListener('message', (ev) => {
            // from server only text data
            const data = JSON.parse(ev.data)
            lastSeenId = data.at(-1).id || 0
            setMessages(prev => [...prev, ...data])
            console.log(data)
        })
        return () => wsRef.current.close()
    }, [])


    // browsRef.currenter: Event, React -> Synthetic Event
    // ev: default action -> load
    /**
     * 
     * @param {SubmitEvent} ev 
     */
    const handleSubmit = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)

        // // data = message (id generated on server)
        // const data = ev.currentTarget.elements.data.value
        wsRef.current?.send(JSON.stringify({
            type: 'message',
            message: formData.get('data'), 
        }))
    }

    return (
        <>
            <MessagesStats items={messages} />
            <MessageForm disabled={isPending} onSubmit={handleSubmit} />
            <MessageList isPending={isPending} items={messages} />
        </>
    )
}

export default Messages
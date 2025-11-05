// TODO:
// 1. Display List
// 2. Display Loading
import Message from "../Message/Message"

const MessageList = ({isPending, items}) => {
    if (isPending) {
        return (
            <>Loading...</>
        )
    }

    return (
        <>
            <h2>Messages</h2>
            {items.map(o => 
                <Message key={o.id} message={o.data}></Message>
            )}
        </>
    )
}

export default MessageList
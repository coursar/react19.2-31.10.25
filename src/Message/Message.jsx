// 1. Data - message (content)
// 1.1. whole message as object -> {id, data, avatar, created, ...} <- Server API
// 1.2. separate fields: data, avatar, created <- UI Kit
// 2. Event Handler - reactions

// props: {
//   name: '',
//   checked: boolean,
//   disabled: boolean,
// }

// const {message} = props;
const Message = ({message}) => {
    return (
        <>
            <div>
                {message}
            </div>
        </>
    )
}

export default Message

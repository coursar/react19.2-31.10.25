// Задача:
// Реализовать код в строках, отмеченных FIXME в этом файле так, чтобы работало сохранение сообщений

// Для запуска проекта:
// 0. npm i && npm run dev в одном терминале
// 1. node server.mjs в другом терминале

// В качестве результата (для зачёта) отправить ТОЛЬКО содержимое этого файла (другие файлы менять не нужно)
// на coursar@ya.ru с темой: SLIT-1001, ФИО

import { useEffect } from "react"
import MessageList from "../MessageList/MessageList"
import MessageForm from "../MessageForm/MessageForm"
import { combineSlices, configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Provider, useDispatch, useSelector } from "react-redux"

const initialMessagesState = {
  messages: [],
  loading: false,
  error: null,
}

const messagesSliceName = 'messages'

const loadMessages = createAsyncThunk(
  `${messagesSliceName}/load`,
  async (arg, api) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/test/poll`)
    if (!response.ok) {
      throw new Error('bad response')
    }
    return await response.json()
  },
)

const saveMessage = createAsyncThunk(
  `${messagesSliceName}/save`,
  /**
   * 
   * @param {URLSearchParams} arg 
   */
  async (arg, api) => {
    // FIXME: напишите реализацию, отправив запрос на следующий адрес:
    // `${import.meta.env.VITE_API_URL}/api/test/message?${arg.toString()}`
  },
)

const messagesSlice = createSlice({
  name: messagesSliceName,
  initialState: initialMessagesState,
  extraReducers: (builder) => {
    builder
      .addAsyncThunk(loadMessages, {
        pending: (state, action) => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.messages = action.payload
        },
        rejected: (state, action) => {
          state.error = action.error
        },
        settled: (state, action) => {
          state.loading = false
        },
      })
      .addAsyncThunk(saveMessage, {
        // FIXME: добавьте обработку pending, fulfilled, rejected, settled
      })
  }
})

const rootReducer = combineSlices(
  messagesSlice,
)

const store = configureStore({
  reducer: rootReducer
})

const Container = () => {
  return (
    <>
      <Provider store={store}>
        <Messages/>
      </Provider>
    </>
  )
}

export default Container

const Messages = () => {
  const {messages, loading, error} = useSelector(messagesSlice.selectSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadMessages())
  }, [])

  /**
   * 
   * @param {SubmitEvent} ev 
   */
  const handleSubmit = async (ev) => {
    ev.preventDefault()

    // data = message (id generated on server)
    const data = ev.currentTarget.elements.data.value
    const params = new URLSearchParams({data: data}) // ?data=message

    // FIXME: добавьте dispatch для saveMessage(params)
  }

  return (
    <>
      <MessageForm disabled={loading} onSubmit={handleSubmit} />
      <MessageList isPending={loading} items={messages} />
    </>
  )
}

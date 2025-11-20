// 1. State Shape
// counter
import { combineSlices, configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector, Provider } from 'react-redux'

// in separate file: slice
const initialCounterState = {
    value: 0,
    loading: false,
    error: null,
}

const counterSliceName = 'counter'

const increment = createAsyncThunk(
    `${counterSliceName}/increment`,
    async (arg, api) => {
        const response = await fetch(
            'http://localhost:9999/api/counter', {
                method: 'POST'
            }
        )
        if (!response.ok) {
            throw new Error(response.statusText) // FIXME: json -> status
        }
        return await response.json()
    }
)

const decrement = createAsyncThunk(
    `${counterSliceName}/decrement`,
    async (arg, api) => {
        const response = await fetch('http://localhost:9999/api/counter', {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(response.statusText) // FIXME: json -> status
        }
        return await response.json()
    }
)

const thunkArg = {
    pending: (state, action) => {
        state.loading = true
        state.error = null
    },
    fulfilled: (state, action) => {
        state.value = action.payload.value
    },
    rejected: (state, action) => {
        state.error = action.error
    },
    settled: (state, action) => {
        state.loading = false
    }
}

const counterSlice = createSlice({
    name: counterSliceName,
    initialState: initialCounterState,
    extraReducers: builder => {
        builder
            .addAsyncThunk(increment, thunkArg)
            .addAsyncThunk(decrement, thunkArg)
    }
})

const ReactReduxToolkitAsyncThunkFinal = () => {
    return (
        <>
            <Provider store={store}>
                <Subscriber/>
            </Provider>
        </>
    )
}


const reducer = combineSlices(
    counterSlice
)

const store = configureStore({
    reducer
})

const Subscriber = () => {
    const {value, loading, error} = useSelector(counterSlice.selectSlice)
    const dispatch = useDispatch()

    const handleIncrement = () => {
        dispatch(increment())
    }

    const handleDecrement = () => {
        dispatch(decrement())
    }

    // bad practice
    if (loading) {
        return <>Loading...</>
    }

    // bad practice
    if (error) {
        return <>Error: {error.message} </>
    }

    return (
        <>
            
            {value}
            <button onClick={handleIncrement}>Inc</button>
            <button onClick={handleDecrement}>Dec</button>
        </>
    )
}

export default ReactReduxToolkitAsyncThunkFinal

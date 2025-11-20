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

const counterSlice = createSlice({
    name: counterSliceName,
    initialState: initialCounterState,
    extraReducers: builder => {
      builder
        .addCase(increment.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        .addCase(increment.fulfilled, (state, action) => {
            state.value = action.payload.value
        })
        // no need for prepare callback
        .addCase(increment.rejected, (state, action) => {
            state.error = action.error
        })
        .addMatcher(increment.settled, (state, action) => {
            state.loading = false
        })
      }
})

const ReactReduxToolkitAsyncThunk = () => {
    return (
        <>
            <Provider store={store}>
                <Subscriber/>
            </Provider>
        </>
    )
}

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

const reducer = combineSlices(
    counterSlice
)

const store = configureStore({
    reducer
})

const Subscriber = () => {
    const {value, loading, error} = useSelector(counterSlice.selectSlice)
    const dispatch = useDispatch()

    const handleClick = () => {
        // increment(dispatch)
        dispatch(increment()) // dispatch(fn)
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
            <button onClick={handleClick}>Click</button>
        </>
    )
}

export default ReactReduxToolkitAsyncThunk

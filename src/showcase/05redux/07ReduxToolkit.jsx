// 1. State Shape
// counter
import { combineReducers, combineSlices, configureStore, createSlice } from '@reduxjs/toolkit'
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
    reducers: {
        incrementRequest: (state, action) => {
            state.loading = true
            state.error = null
        },
        incrementSuccess: (state, action) => {
            state.loading = false
            state.value = action.payload
        },
        // not work
        // incrementFail: (state, action) => {
        //     state.loading = false
        //     // FIXME: not work
        //     state.error = action.payload
        // },
        incrementFail: {
            reducer(state, action) {
                state.loading = false
                state.error = action.error
            },
            prepare(error) {
                return { payload: {}, error }
            },
        },
    },

})

const {incrementRequest, incrementSuccess, incrementFail} = counterSlice.actions

const ReactReduxToolkit = () => {
    return (
        <>
            <Provider store={store}>
                <Subscriber/>
            </Provider>
        </>
    )
}

const increment = () => async (dispatch, getState) => {
    dispatch(incrementRequest())
    try {
        const response = await fetch(
            'http://localhost:9999/api/counter', {
                method: 'POST'
            }
        )
        if (!response.ok) {
            throw new Error(response.statusText) // FIXME: json -> status
        }
        const body = await response.json()
        dispatch(incrementSuccess(body.value))
    } catch (e) {
        // dispatch(fn(arg)) => action.payload = arg
        // arg - must be serializable
        // if prepare: dispatch(fn(arg)) => prepare(arg) => action
        dispatch(incrementFail({message: e.message}))
    }
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

export default ReactReduxToolkit

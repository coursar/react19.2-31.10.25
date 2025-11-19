// 1. State Shape
// counter
import { useDispatch, useSelector } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'

const initialCounterState = {
    value: 0,
    loading: false,
    error: null,
}

const INCREMENT_REQUEST = 'INCREMENT_REQUEST'
const INCREMENT_SUCCESS = 'INCREMENT_SUCCESS'
const INCREMENT_FAIL = 'INCREMENT_FAIL'

const counterReducer = (state = initialCounterState, action) => {
    switch (action.type) {
        case INCREMENT_REQUEST: 
            return {...state, loading: true, error: null}
        case INCREMENT_SUCCESS: 
            return {...state, loading: false, error: null, value: action.payload}
        case INCREMENT_FAIL: 
            return {...state, loading: false, error: action.error}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    counter: counterReducer,
    // messages: messagesReducer
})

const store = legacy_createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// store.getState
// store.dispatch
// store.subscribe

const ReactReduxSideEffect = () => {
    return (
        <>
            <Provider store={store}>
                <Subscriber/>
            </Provider>
        </>
    )
}

// in separate file (action creator)
const incrementRequest = (payload = {}) => ({
    type: INCREMENT_REQUEST,
    payload,
})
const incrementSuccess = (payload = {}) => ({
    type: INCREMENT_SUCCESS,
    payload,
})
const incrementFail = (error) => ({
    type: INCREMENT_FAIL,
    error,
})

const increment = async (dispatch) => {
    dispatch(incrementRequest())
    try {
        const response = await fetch('http://localhost:9999/api/counter')
        if (!response.ok) {
            throw new Error(response.statusText) // FIXME: json -> status
        }
        const body = await response.json()
        dispatch(incrementSuccess(body.value))
    } catch (e) {
        dispatch(incrementFail({message: e.message}))
    }

}

const counterSelector = (state) => state.counter

// 1. Action Creators <-
// 2. Middleware (rare)

const Subscriber = () => {
    const counter = useSelector(counterSelector)
    const dispatch = useDispatch()

    const handleClick = () => {
        increment(dispatch)
        // dispatch(increment()) => redux thunk
    }

    // bad practice
    if (counter.loading) {
        return <>Loading...</>
    }

    return (
        <>
            
            {counter.value}
            <button onClick={handleClick}>Click</button>
        </>
    )
}

export default ReactReduxSideEffect
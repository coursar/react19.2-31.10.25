// 1. State Shape
// counter
import { useSyncExternalStore } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'

const initialCounterState = {
    value: 0,
    loading: false,
    error: null,
}

const INCREMENT = 'INCREMENT'

const counterReducer = (state = initialCounterState, action) => {
    switch (action.type) {
        case INCREMENT: 
            return {...state, value: state.value + 1}
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

const ReactReduxStore = () => {
    return (
        <>
            <Provider store={store}>
                <Subscriber/>
            </Provider>
        </>
    )
}

// in separate file (action creator)
const increment = (payload = {}) => ({
    type: INCREMENT,
    payload,
    // payload
    // error
    // meta
})

// 

const counterSelector = (state) => state.counter

const Subscriber = () => {
    const counter = useSelector(counterSelector)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(increment())
    }

    return (
        <>
            {counter.value}
            <button onClick={handleClick}>Click</button>
        </>
    )
}

export default ReactReduxStore
// 1. State Shape
// counter
import { useSyncExternalStore } from 'react'
import { combineReducers, legacy_createStore } from 'redux'

const initialCounterState = {
    value: 0,
    loading: false,
    error: null,
}

const INCREMENT = 'INCREMENT'

const counterReducer = (state = initialCounterState, action) => {
    console.log(action)
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

const ReduxStore = () => {
    const state = useSyncExternalStore(store.subscribe, store.getState)

    const handleClick = () => {
        store.dispatch({
            type: INCREMENT,
        })
    }

    return (
        <>
            {state?.counter?.value}
            <button onClick={handleClick}>Click</button>
        </>
    )
}

export default ReduxStore
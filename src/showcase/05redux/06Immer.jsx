// 1. State Shape
// counter
import { useDispatch, useSelector, Provider } from 'react-redux'
import { combineReducers, legacy_createStore, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import {produce} from "immer"

// Java, JS -> Proxy

const targetObject = {
    value: 0,
}

const proxy = new Proxy(targetObject, {
    // read target.value
    get(target, prop, receiver) {
        console.log('get')
        return Reflect.get(...arguments)
    },
    // set target.value
    set(target, prop, receiver) {
        console.log('set')
        return Reflect.set(...arguments)
    },
})

proxy.value++

const baseState = {
    value: 0,
    loading: false,
    error: null,
}

const nextState = produce(baseState, draft => {
    draft.value++
})

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
            return produce(state, draft => {
                draft.loading = true
                draft.error = null
            })
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

const logMiddleware = (store) => (next) => (action) => {
    console.log('dispatching', action)
    return next(action)
}

const middlewares = [logMiddleware, thunk]

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);
const store = legacy_createStore(rootReducer, enhancer);

// store.getState
// store.dispatch
// store.subscribe

const ReactReduxThunk = () => {
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
        // increment(dispatch)
        dispatch(increment()) // dispatch(fn)
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

export default ReactReduxThunk

import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'

const el = <div></div> // createElement(App, ...)
// stopped here

// HTML "Analogue" => rootEl.innerHTML = <App />
// createRoot(document.getElementById('root')).render(
//   <App />
// )

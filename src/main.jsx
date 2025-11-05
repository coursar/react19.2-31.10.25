import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'
import Main from './showcase/Main.jsx'

createRoot(document.getElementById('root'), {identifierPrefix: 'messages_'}).render(
  // <StrictMode>
    <App />
  // </StrictMode>
)

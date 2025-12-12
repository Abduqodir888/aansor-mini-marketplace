import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './catalog.js'
import App from './App.jsx'

const cartRoot = document.getElementById('cart-root')

createRoot(cartRoot).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TestContextProvider } from './components/context/TestContextAPI.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TestContextProvider>
  </StrictMode>,
)

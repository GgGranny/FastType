import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TestContextProvider } from './components/context/TestContextAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestContextProvider>
      <App />
    </TestContextProvider>
  </StrictMode>,
)

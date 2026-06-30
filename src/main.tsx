import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import EnrolledPage from './Pages/EnrolledPage.tsx'
import { reportWebVitals } from './reportWebVitals'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      {window.location.pathname.startsWith('/internship')
        ? <EnrolledPage />
        : <App />}
    </HelmetProvider>
  </StrictMode>,
)

reportWebVitals()

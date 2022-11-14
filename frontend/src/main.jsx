import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SearchContextProvider } from './context/search'

// Import custom bootstrap
import './css/custom.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SearchContextProvider>
            <App />
        </SearchContextProvider>
    </React.StrictMode>
)

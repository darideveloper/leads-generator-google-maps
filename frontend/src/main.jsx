import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SearchContextProvider } from './context/search'
import { ScreenContextProvider } from './context/screen'

// Import custom bootstrap
import './css/custom.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ScreenContextProvider>
            <SearchContextProvider>
                <App />
            </SearchContextProvider>
        </ScreenContextProvider>
    </React.StrictMode>
)

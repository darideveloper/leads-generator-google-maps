import React from 'react'
import ReactDOM from 'react-dom/client'
import { SearchContextProvider } from './context/search'
import { ScreenContextProvider } from './context/screen'

// Import custom bootstrap
import './css/custom.css'

// React routing
import Root from './routes/root'
import NotFound from './routes/errors/not-found'
import Search from './routes/search'
import Loading from './routes/loading'
import Results from './routes/results'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <NotFound/>,
        // loader: rootLoader,
        children: [
            {
                path: '/',
                element: <Search/>
            },
            {
                path: '/loading',
                element: <Loading/>
            },
            {
                path: '/results',
                element: <Results/>
            }
        ]
    }, 
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ScreenContextProvider>
            <SearchContextProvider>
                <RouterProvider router={router} />
            </SearchContextProvider>
        </ScreenContextProvider>
    </React.StrictMode>
)

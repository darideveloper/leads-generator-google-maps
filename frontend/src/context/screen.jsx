import { createContext, useState, useEffect } from "react"

export const ScreenContext = createContext()

const api_url = "http://localhost:5000"



export function ScreenContextProvider({ children }) {
    const [screen, setScreen] = useState("loading")
    
    // Refresh when screen change
    useEffect (() => {}, [screen])

    // Validate local client when load, and redirect to main page
    useEffect (() => {validate_client("search")}, [])
    
    function validate_client (go_screen) {
        // Check if client is running in localhost
        
        fetch(api_url, {
            method:'GET'
        })
        .then ((response) => response.json())
        .then ((data) => {
            if (data.app == "leads google maps") {
                // Redirect to search screen
                if (go_screen) {
                    setScreen(go_screen)
                }
            } else {
                throw "error"
            }
        })
    
        // Redirect to error screen
        .catch (() => setScreen('error-client'))
    }
    
    return (
        <ScreenContext.Provider
            value={{
                screen,
                setScreen,
                validate_client,
                api_url
            }}>
            {children}
        </ScreenContext.Provider>
    )
}
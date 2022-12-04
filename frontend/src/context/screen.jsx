import { createContext, useState, useEffect } from "react"

export const ScreenContext = createContext()

export const api_url = "http://localhost:5000"

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

export function ScreenContextProvider({ children }) {

    const [screen, setScreen] = useState("loading")
    const [loading_status, setLoadingStatus] = useState("")
    
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

    async function update_status_api (screen) {
        // get current status from api and update it
        
        while (true) {

            // get status and update
            let status_endpoint = `${api_url}/status`
            fetch(status_endpoint, {method: 'GET'}, setTimeout(() => {}, 1000))
            .then((response) => response.json())
            .then ((data) => {
                setLoadingStatus(data.status)
                if (data.status == "done") {
                    setScreen("results")
                }
            })
            .catch ((error) => {setLoadingStatus("")})

            await sleep (5)

        }
    }

    // Refresh when screen change
    useEffect (() => {}, [screen])
    
    // Start status checker to the backend, and validate local client when load, and redirect to main page
    useEffect (() => {update_status_api (screen); validate_client("search")}, [])
    
    return (
        <ScreenContext.Provider
            value={{
                screen,
                setScreen,
                validate_client,
                api_url,
                loading_status
            }}>
            {children}
        </ScreenContext.Provider>
    )
}
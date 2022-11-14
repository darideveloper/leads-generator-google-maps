import { useState, useEffect, useContext } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Search from './components/search'
import SampleTable from './components/sample_table'
import Loading from './components/loading'
import ClientError from './components/client_error'
import { SearchContext } from './context/search'

function validate_client (api_url, setScreen) {
    // Check if client is running in localhost
    
    fetch(api_url, {
        method:'GET'
    })
    .then ((response) => response.json())
    .then ((data) => {
        if (data.app == "leads google maps") {
            // Redirect to search screen
            setScreen('search')
        } else {
            throw "error"
        }
    })

    // Redirect to error screen
    .catch (() => setScreen('error-client'))

}

function App() {

    // Screen control
    const [screen, setScreen] = useState('loading')
    useEffect (() => {}, [screen])

    // Validate local client when load
    const { api_url } = useContext(SearchContext)
    useEffect (() => {validate_client(api_url, setScreen)}, [])


    let render_screen
    if (screen == 'search') {
        render_screen = (<>
            <Search setScreen={setScreen}/>
            <SampleTable />
        </>)
    } else if (screen == 'loading') {
        render_screen = (<Loading />)
    } else if (screen == 'error-client') {
        render_screen = (<ClientError/>)
    }

    return (
        <>
            <Header />
            <div className='container'>
                {render_screen}
            </div>
            <Footer />
        </>
    )
}

export default App

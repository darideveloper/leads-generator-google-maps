import { useState, useEffect, useContext } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Search from './components/search'
import SampleTable from './components/sample_table'
import Loading from './components/loading'
import ClientError from './components/client_error'
import { ScreenContext } from './context/screen'



function App() {

    // Screen control
    // const [screen, setScreen] = useState('loading')
    
    // Validate local client when load
    const { screen } = useContext(ScreenContext)

    let render_screen
    if (screen == 'search') {
        render_screen = (<>
            <Search/>
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

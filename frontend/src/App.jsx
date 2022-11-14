import { useState, useEffect } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Search from './components/search'
import SampleTable from './components/sample_table'
import Loading from './components/loading'
import { SearchContextProvider } from './context/search'

function App() {

    const [screen, setScreen] = useState('search')

    useEffect (() => {}, [screen])

    let render_screen
    if (screen == 'search') {
        render_screen = (<>
            <Search setScreen={setScreen}/>
            <SampleTable />
        </>)
    } else if (screen == 'loading') {
        render_screen = (<Loading value='Loading...' />)
    }

    return (
        <SearchContextProvider>
            <Header />
            <div className='container'>
                {render_screen}
            </div>
            <Footer />
        </SearchContextProvider>
    )
}

export default App

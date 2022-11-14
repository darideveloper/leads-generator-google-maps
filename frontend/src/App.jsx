import { useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Search from './components/search'
import SampleTable from './components/sample_table'
import { SearchContextProvider } from './context/search'

function App() {
    return (
        <SearchContextProvider>
            <Header />
            <div className='container'>
                <Search />
                <SampleTable />
            </div>
            <Footer />
        </SearchContextProvider>
    )
}

export default App

import { useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Search from './components/Search'

function App() {
    const [count, setCount] = useState(0)

    return (
      <>
        <Header />
        <div className="container">
          <Search />
        </div>
        <Footer />
      </>
    )
}

export default App

import { useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'

function App() {
    const [count, setCount] = useState(0)

    return (
      <>
        <Header ></Header>

        <Footer ></Footer>
      </>
    )
}

export default App

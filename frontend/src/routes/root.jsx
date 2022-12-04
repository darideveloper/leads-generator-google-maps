import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'

export default function root () {
    return (
        <>
            <Header/>
                <div className='container'>
                    <Outlet/>
                </div>
            <Footer/>
        </>
    )
}
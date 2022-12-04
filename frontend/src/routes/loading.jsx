import FullScreen from "../components/full_screen"
import { useContext } from "react"
import { ScreenContext } from "../context/screen"

export default function Loading() {

    const { loading_status } = useContext(ScreenContext)

    return (
        <FullScreen 
            icon={<div className='spinner-border m-4' role='status'></div>}
            title="Loading..."
            message={<p>{loading_status}</p>}
        ></FullScreen>
    )
}

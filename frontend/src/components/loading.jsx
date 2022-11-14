import FullScreen from "./full_screen"

export default function Loading() {
    return (
        <FullScreen 
            icon={<div className='spinner-border m-4' role='status'></div>}
            title="Loading..."
            message={<p></p>}
        ></FullScreen>
    )
}

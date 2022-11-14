export default function Loading() {
    return (
        <div className='flex-column modal-loading vw-100 vh-100 d-flex align-items-center justify-content-center position-absolute top-0 start-0 bg-white'>
            <div className='spinner-wrapper d-flex align-items-center'>
                <div
                    className='spinner-border m-4'
                    role='status'
                ></div>
                <h1>Loading...</h1>
            </div>
            <p></p>
        </div>
    )
}

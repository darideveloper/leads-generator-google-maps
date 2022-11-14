export default function Header() {
    return (
        <header>
            <div className='d-flex my-5 align-items-center justify-content-center'>
                <img
                    className='mx-2'
                    src='maps-logo.png'
                    alt='google maps logo'
                />
                <a
                    href='https://www.darideveloper.com/'
                    target='_blank'
                >
                    <img
                        className='mx-2'
                        src='daridev-logo.png'
                        alt='dari developer logo'
                    />
                </a>
                <h1 className='mx-2 text-center text-lg-start'>
                    Google Maps Leads Generator
                </h1>
            </div>
        </header>
    )
}

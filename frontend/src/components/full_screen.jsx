import PropTypes from "prop-types"

export default function FullScreen({icon, title, message}) {
    return (
        <div className='flex-column modal-loading vw-100 vh-100 d-flex align-items-center justify-content-center position-absolute top-0 start-0 bg-white'>
            <div className='spinner-wrapper d-flex align-items-center'>
                {icon}
                <h1>{title}</h1>
            </div>
            {message}
        </div>
    )
}

FullScreen.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.element
}



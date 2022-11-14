import PropTypes from "prop-types"

function validate_input (e) {
    // Get valid status
    let input_check = e.target
    let isvalid = input_check.checkValidity ()

    // add or remove invalid class
    if (isvalid) {
        input_check.parentNode.classList.remove ("invalid")
    } else {
        input_check.parentNode.classList.add ("invalid")
    }
} 

export default function Input ({value, label, input_type, name, placeholder, help_text, error_text, min_lenght, onChange, required, min, max}) {
    return (
        <div className="mb-3 input-check">
            <label className="form-label fw-bold" htmlFor={name}>{label}</label>
            <input 
                className="form-control" 
                type={input_type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                minLength={min_lenght}
                // Validate input and save value
                onChange={(e) => { validate_input(e); onChange(e) }}
                value={value}
                required={required} 
                min={min}
                max={max}
                />
            <p className="form-text mb-0">{help_text}</p>
            <p className="error text-danger form-text">{error_text}</p>
        </div>
    )
}

Input.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    input_type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    help_text: PropTypes.string.isRequired,
    error_text: PropTypes.string,
    min_lenght: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number
}
export default function Checkbox({name, label, value, onChange}) {
    return (
        <div className='mb-3 form-check col-12 col-md-3 col-lg-2'>
            <input
                className='form-check-input'
                type='checkbox'
                name={name}
                id={name}
                checked={value}
                onChange={onChange}
            />
            <label
                className='form-check-label'
                htmlFor={name}
            >
                {label}
            </label>
        </div>
    )
}

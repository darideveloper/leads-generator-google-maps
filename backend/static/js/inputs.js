// Inputs validation

const inputs_check = document.querySelectorAll (".input-check input")
const input_submit = document.querySelector('button[type="submit"]')

// Validate inputs
for (const input_check of inputs_check) {
    input_check.addEventListener ("change", (e) => {

        // Get valid status
        isvalid = input_check.checkValidity ()

        // add or remove invalid class
        if (isvalid) {
            input_check.parentNode.classList.remove ("invalid")
        } else {
            input_check.parentNode.classList.add ("invalid")
        }

    })
}

// Show and hide loading modal

const modal = document.querySelector('.modal-loading')
const form = document.querySelector('form')
const main = document.querySelector ('main')

function show_spinner () {
    modal.classList.remove ("hidden")
    main.classList.add ("hidden")
}

function hide_spinner () {
    modal.classList.add ("hidden")
    main.classList.remove ("hidden")

}

// Show spinner on submit form
form.addEventListener('submit', () => {
    show_spinner ()
})

// Show spinner when page load in loading state
if (is_loading) {
    show_spinner () 
}

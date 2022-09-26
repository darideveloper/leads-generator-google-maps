const modal = document.querySelector('.modal-loading')
const form = document.querySelector('form')
const main = document.querySelector ('main')

form.addEventListener('submit', () => {
    modal.classList.remove ("hidden")
    main.classList.add ("hidden")
})

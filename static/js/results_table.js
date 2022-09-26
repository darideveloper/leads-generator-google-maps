const inputs = document.querySelectorAll('input')
const table_body = document.querySelector('tbody')
const wrapper_table = document.querySelector('.wrapper-table')
const table_data_base = [
    'www.google.com...',
    '',
    '',
    'Tennessee Turf',
    '',
    '',
    'Garden service',
    '137 Cherokee Rd',
    'Closed ⋅ Opens at...',
    'www.darideveloper.com',
    'contact@gmail.com,sales@gmail.com',
]
var table_data = []
var min_reviews_note = 0
var min_reviews_num = 0

const start_table = () => {
    // Copy base list
    for (let i = 0; i < 9; i++) {
        table_data.push([...table_data_base])
    }

    // Generate random reviews number
    random_save (min=0, max=1000, column=4)
    
    // Generate random reviews note
    random_save (min=0, max=5, column=5)

    // Reset table
    update_table()

    // Add event listener to the inputs
    for (const input of inputs) {
        input.addEventListener('keyup', (e) => {
            update_date(e)
            update_table()
        })
    }
}

function update_date(e) {
    // Update data with user inputs events

    // Update keywords in sample data
    if (e.target.id == 'keywords') {
        table_data = table_data.map((row) => {
            row[1] = e.target.value
            return row
        })
    }

    // Update cities
    if (e.target.id == 'cities') {
        table_data = table_data.map((row) => {
            row[2] = e.target.value
            return row
        })
    }

    // Update min review note
    if (e.target.id == 'min-reviews-note') {
        min_reviews_note = parseFloat (e.target.value)
        random_save (min=min_reviews_note, max=5, column=5)
    }

    // update min review number
    if (e.target.id == 'min-reviews-num') {
        min_reviews_num = parseFloat (e.target.value)
        random_save (min=min_reviews_num, max=100, column=4)
    }

    // activate columns
    if (e.target.type == 'checkbox') {
        let column = parseInt(e.target.getAttribute('column'))

        if (e.target.checked) {
            // add sample data ro row
            table_data = table_data.map((row) => {
                row[column] = table_data_base[column]
                return row
            })

            if (e.target.id == 'save_reviews_note') {
                random_save (min=min_reviews_note, max=5, column=5)
            }
        
            // update min review number
            if (e.target.id == 'save_reviews_num') {
                console.log (min_reviews_num)
                random_save (min=min_reviews_num, max=100, column=4)
            }

        } else {
            // delete row column
            table_data = table_data.map((row) => {
                row[column] = ""
                return row
            })
        }
    }
}

function update_table() {
    // Draw table with the current data

    // Delete last tabñe
    table_body.innerHTML = ''

    // Validate if the are keywords and city
    keyword = table_data[0][1]
    city = table_data[0][2]
    if (keyword && city) {

        // Show full table
        wrapper_table.classList.remove ("hidden")

        let html = ''

        // Create rows
        for (const [row_id, row] of table_data.entries()) {
            let row_html = ''

            // Class for hide rows in mobile
            class_name = ''
            if (row_id >= 4) {
                class_name = 'hide-mobile'
            }

            // Save cell
            for (const cell of row) {
                row_html += `<td class="${class_name}">${cell}</td>`
            }

            // Save row
            html += `<tr>${row_html}</tr>`

            // Insert html in table body
            table_body.innerHTML = html
        }
    } else {
        // Hide full table 
        wrapper_table.classList.add ("hidden")
    }
}

function random_save (min, max, column) {
    // Ggenerate random values and save in specific column of the table
    table_data = table_data.map((row) => {
        row[column] = Math.floor(Math.random() * (max+1 - min)) + min
        return row
    })
}

start_table ()
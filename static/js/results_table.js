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

const start_table = () => {
    // Copy base list
    for (let i = 0; i < 9; i++) {
        table_data.push([...table_data_base])
    }

    // Generate random reviews num
    table_data = table_data.map((row) => {
        row[4] = Math.floor(Math.random() * 100)
        return row
    })

    // Generate random note
    table_data = table_data.map((row) => {
        row[5] = Math.floor(Math.random() * 50) / 10
        return row
    })

    // Reset table
    update_table()

    // Add event listener to the inputs
    for (const input of inputs) {
        input.addEventListener('change', (e) => {
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
        table_data = table_data.map((row) => {
            const value = parseFloat (e.target.value)
            row[5] = Math.floor(Math.random() * (5 - value)) + value
            return row
        })
    }

    // update min review number
    if (e.target.id == 'min-reviews-num') {
        table_data = table_data.map((row) => {
            const value = parseFloat (e.target.value)
            row[4] = Math.floor(Math.random() * (100 - value)) + value
            return row
        })
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
        } else {
            // delete row column
            table_data = table_data.map((row) => {
                row.splice(column, 1)
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

start_table ()
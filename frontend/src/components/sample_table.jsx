import { useContext, useEffect, useState } from "react"
import { SearchContext } from "../context/search"

function get_random (min, max) {
    // Ggenerate random values and save in specific column of the table
    return Math.floor(Math.random() * (max+1 - min)) + min
}

function save_cell_header (header, row, header_item, row_item, conditional, index) {
    // Validate condition for save cell value and header for table
    if (conditional) {
        row.push (row_item)
        if (index==1) {
            header.push(header_item)
        }
    }
}

export default function SampleTable({}) {

    const [rows, SetRows] = useState([])
    const [headers, SetHeaders] = useState([])

    // Form variabvles and setters
    const { 
        keywords,
        cities,
        max,
        reviews_note,
        reviews_number,
        emails,
        save_emails,
        save_name,
        save_reviews,
        save_note,
        save_category,
        save_location,
        save_details,
        save_website,
    } = useContext(SearchContext)

    useEffect (()=> {

        // Default values for inputs
        let current_reviews_note = reviews_note || 0
        let current_reviews_number = reviews_number || 0

        // Validate required values
        if (keywords === "" || cities === "" || max === "") {
            return
        }

        // Generate sample data for rows
        let new_rows = []
        let new_headers = []
        for (let i = 0; i < 10; i++) {
            let row = []

            // Save main data and headers
            save_cell_header (new_headers, row, "Maps Link", "www.google.com...", true, i)
            save_cell_header (new_headers, row, "Keywords", keywords, true, i)
            save_cell_header (new_headers, row, "Cities", cities, true, i)


            // Save secondary data and headers
            save_cell_header (new_headers, row, "Name", "Sample bussiness name", save_name, i)
            save_cell_header (new_headers, row, "Reviews", get_random(0, 100), save_reviews, i)
            save_cell_header (new_headers, row, "Note", get_random(0, 5), save_note, i)
            save_cell_header (new_headers, row, "Category", "Software Development", save_category, i)
            save_cell_header (new_headers, row, "Location", `${cities} city`, save_location, i)
            save_cell_header (new_headers, row, "Details", "Open from 8:00 am to...", save_details, i)
            save_cell_header (new_headers, row, "Website", "www.google.com", save_website, i)
            save_cell_header (new_headers, row, "Emails", "contact@gmail.com, sales@gmail.com", save_emails, i)

            // Save current row
            new_rows.push(row)
        }

        // Update states
        SetRows (new_rows)
        SetHeaders (new_headers)

    }, [keywords, cities, max, reviews_note, reviews_number, emails, save_emails, save_name, save_reviews, save_note, save_category, save_location, save_details, save_website])


    useEffect (() => {}, [rows])


    return (

        <div>
            <h2 className='mb-3'>Sample results</h2>
            <p>
                Sample data after web scraping (fill the search section for
                display some rows)
            </p>
            <p className="fs-6 fst-italic">
                Note: this is only sample data, run the program for generate the real results
            </p>
            <div className='wrapper-table overflow-scroll'>
                <table className='table w-100 table-hover table-responsive-sm'>

                    {/* Render headers */}
                    <thead>
                        <tr>
                            {headers.map((header, index) => {
                                return (<th scope='col' key={index}>
                                        <span className='m-1'>{header}</span>
                                    </th>)
                            })}
                        </tr>
                    </thead>

                    {/* render rows */}
                    <tbody>
                        {/* Render table content */}
                        {rows.map ((row, index_row) => {
                            return (<tr key={index_row}>
                                {row.map ((cell, index_cell) => {
                                    return <td key={`${index_row}-${index_cell}`}>{cell}</td>
                                })}
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

import Input from "./input"
import { useState } from "react"

export default function Search () {

    const [ keywords, setKeywords ] = useState ("")
    const [ cities, setCities ] = useState ("")
    const [ max, setMax ] = useState ("")
    const [ reviews_note, setReviewsNote ] = useState ("")
    const [ reviews_number, setReviewsNumber ] = useState ("")
    const [ emails, setEmails ] = useState ("")

    return (
        <form className="d-flex flex-column" action="/" method="post">
        <div className="row">
            <div className="col-12 col-md-6 p-3">
                <h2>Search</h2>

                <Input 
                    value={keywords}
                    label="Keywords" 
                    input_type="text" 
                    name="keywords" 
                    placeholder="Health Care, Food, Accommodation" 
                    help_text="keywords to search the business in google maps (separated by comma)"
                    error_text="type at least one correct keyword"
                    min_lenght={4}
                    onChange={(e) => setKeywords(e.target.value)}
                    required={true}>
                </Input>

                <Input 
                    value={cities}
                    label="Cities" 
                    input_type="text" 
                    name="cities" 
                    placeholder="New York, Chicago Illinois, Charleston South Carolina" 
                    help_text="cities to search the business keywords in google maps (separated by comma)"
                    error_text="type at least the full name of one correct city"
                    min_lenght={4}
                    onChange={(e) => setCities(e.target.value)}
                    required={true}>
                </Input>

                <Input 
                    value={max}
                    label="Max business" 
                    input_type="number" 
                    name="max" 
                    placeholder="100" 
                    help_text="max business of business to scrape or get data"
                    error_text="type a number greater than 0"
                    min_lenght={1}
                    onChange={(e) => setMax(e.target.value)}
                    required={true}>
                </Input>

            </div>
            <div className="col-12 col-md-6 p-3">
                <h2>Filters</h2>
                <Input 
                    value={reviews_note}
                    label="Min review note" 
                    input_type="number" 
                    name="min-reviews-note" 
                    placeholder="4.5" 
                    help_text="the business with a lower review note than this number will be skipped"
                    error_text="type a number between 0 and 5"
                    min_lenght={1}
                    onChange={(e) => setReviewsNote(e.target.value)}
                    min={1}
                    max={5}
                    >
                </Input>

                <Input 
                    value={reviews_number}
                    label="Min number of reviews" 
                    input_type="number" 
                    name="min-reviews-note" 
                    placeholder="4.5" 
                    help_text="the business with a lower reviews than this number will be skipped"
                    error_text="type a number between 0 and 100"
                    min_lenght={1}
                    onChange={(e) => setReviewsNumber(e.target.value)}
                    min={0}
                    max={100}
                    >
                </Input>

                <Input 
                    value={emails}
                    label="Emails skip" 
                    input_type="text" 
                    name="skip-emails" 
                    placeholder="darideveloper, support, wix" 
                    help_text="the emails with any of this words will not be saved"
                    onChange={(e) => setEmails(e.target.value)}
                    >
                </Input>
            </div>
        </div>

        {/* <div className="mb-4">
            <h2 className="col-12 mb-3">Save data</h2>
            <p>Select the data to save from each business (select only your required data generate the files faster)</p>
            <div className="row px-3 px-sm-0">
                <div className="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input className="form-check-input" type="checkbox" name="save-emails" id="save-emails" checked column="10" />
                    <label className="form-check-label" htmlFor="save-emails">Extract and save email from business website</label>
                </div>
                <div className="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input className="form-check-input" type="checkbox" name="save-name" id="save-name" checked column="3" />
                    <label className="form-check-label" htmlFor="save-name">Save business name</label>
                </div>
                <div className="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input className="form-check-input" type="checkbox" name="save-reviews-num" id="save-reviews-num" checked column="4" />
                    <label className="form-check-label" htmlFor="save-reviews-num">Save business reviews number</label>
                </div>
                <div className="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input className="form-check-input" type="checkbox" name="save-reviews-note" id="save-reviews-note" checked column="5" />
                    <label className="form-check-label" htmlFor="save-reviews-note">Save reviews note</label>
                </div>
                <div className="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input className="form-check-input" type="checkbox" name="save-category" id="save-category" checked column="6" />
                    <label className="form-check-label" htmlFor="save-category">Save business category</label>
                </div>
                <div className="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input className="form-check-input" type="checkbox" name="save-location" id="save-location" checked column="7" />
                    <label className="form-check-label" htmlFor="save-location">Save business location</label>
                </div>
                <div className="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input className="form-check-input" type="checkbox" name="save-details" id="save-details" checked column="9" />
                    <label className="form-check-label" htmlFor="save-details">Save business details</label>
                </div>
                <div className="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input className="form-check-input" type="checkbox" name="save-web-page" id="save-web-page" checked column="9" />
                    <label className="form-check-label" htmlFor="save-web-page">Save business website</label>
                </div>                    
            </div>
        </div> */}

        <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-25" type="submit">Start</button>
        </div>              
    </form>
    )
}
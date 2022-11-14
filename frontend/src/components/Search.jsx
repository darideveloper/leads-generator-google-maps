import Input from "./input"
import Checkbox from "./checkbox"
import { useState } from "react"

export default function Search () {

    // Form variables
    const [ keywords, setKeywords ] = useState ("")
    const [ cities, setCities ] = useState ("")
    const [ max, setMax ] = useState ("")
    const [ reviews_note, setReviewsNote ] = useState ("")
    const [ reviews_number, setReviewsNumber ] = useState ("")
    const [ emails, setEmails ] = useState ("")
    const [ check_emails, setCheckEmails ] = useState (true)
    const [ check_name, setCheckName ] = useState (true)
    const [ check_reviews, setCheckReviews ] = useState (true)
    const [ check_note, setCheckNotes ] = useState (true)
    const [ check_category, setCheckCategory ] = useState (true)
    const [ check_location, setCheckLocation ] = useState (true)
    const [ check_details, setCheckDetails ] = useState (true)
    const [ check_website, setCheckWebsite ] = useState (true)

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

        <div className="mb-4">
            <h2 className="col-12 mb-3">Save data</h2>
            <p>Select the data to save from each business (select only your required data generate the files faster)</p>
            <div className="row px-3 px-sm-0">

                <Checkbox
                    name="save-emails"
                    label="Extract and save email from business website"
                    value={check_emails}
                    onChange={(e) => {setCheckEmails(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-name"
                    label="Save business name"
                    value={check_name}
                    onChange={(e) => {setCheckName(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-reviews"
                    label="Save business reviews number"
                    value={check_reviews}
                    onChange={(e) => {setCheckReviews(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-note"
                    label="Save reviews note"
                    value={check_note}
                    onChange={(e) => {setCheckNotes(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-category"
                    label="Save business category"
                    value={check_category}
                    onChange={(e) => {setCheckCategory(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-location"
                    label="Save business location"
                    value={check_location}
                    onChange={(e) => {setCheckLocation(e.target.checked)}}    
                    >
                </Checkbox>
                
                <Checkbox
                    name="save-details"
                    label="Save business details"
                    value={check_details}
                    onChange={(e) => {setCheckDetails(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-website"
                    label="Save business website"
                    value={check_website}
                    onChange={(e) => {setCheckWebsite(e.target.checked)}}    
                    >
                </Checkbox>
                              
            </div>
        </div>

        <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-25" type="submit">Start</button>
        </div>              
    </form>
    )
}
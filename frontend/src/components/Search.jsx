import Input from "./input"
import Checkbox from "./checkbox"
import { useContext } from "react"
import { SearchContext } from "../context/search"
import PropTypes from "prop-types"

export default function Search ({setScreen}) {

    function submit_form (e) {
        e.preventDefault()
    
        // Submit data to backend
        const data = new URLSearchParams()
        for (const pair of new FormData(e.target)) {
            data.append(pair[0], pair[1])
        }

        fetch('http://localhost:5000', {
            method: 'POST',
            body: data,
        }).then ((response) => {
            console.log (response)
        }).catch ((error) => {
            console.log (error)
        })
    
        // Change screen to loading
        // setScreen('loading')
    }

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

     const { 
        setKeywords,
        setCities,
        setMax,
        setReviewsNote,
        setReviewsNumber,
        setEmails,
        setSaveEmails,
        setSaveName,
        setSaveReviews,
        setSaveNotes,
        setSaveCategory,
        setSaveLocation,
        setSaveDetails,
        setSaveWebsite,
     } = useContext(SearchContext)

    return (
        <form className="d-flex flex-column" action="localhost:5000" method="post" onSubmit={submit_form}>
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
                    min={0}
                    max={5}
                    >
                </Input>

                <Input 
                    value={reviews_number}
                    label="Min number of reviews" 
                    input_type="number" 
                    name="min-reviews-note" 
                    placeholder="20" 
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
                    name="save-name"
                    label="Save business name"
                    value={save_name}
                    onChange={(e) => {setSaveName(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-reviews"
                    label="Save business reviews number"
                    value={save_reviews}
                    onChange={(e) => {setSaveReviews(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-note"
                    label="Save reviews note"
                    value={save_note}
                    onChange={(e) => {setSaveNotes(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-category"
                    label="Save business category"
                    value={save_category}
                    onChange={(e) => {setSaveCategory(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-location"
                    label="Save business location"
                    value={save_location}
                    onChange={(e) => {setSaveLocation(e.target.checked)}}    
                    >
                </Checkbox>
                
                <Checkbox
                    name="save-details"
                    label="Save business details"
                    value={save_details}
                    onChange={(e) => {setSaveDetails(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-website"
                    label="Save business website"
                    value={save_website}
                    onChange={(e) => {setSaveWebsite(e.target.checked)}}    
                    >
                </Checkbox>

                <Checkbox
                    name="save-emails"
                    label="Extract and save email from business website"
                    value={save_emails}
                    onChange={(e) => {setSaveEmails(e.target.checked)}}    
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

Search.propTypes = {
    setScreen: PropTypes.func.isRequired,
}
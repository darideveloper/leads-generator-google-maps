export default function Search () {
    return (
        <form class="d-flex flex-column" action="/" method="post">
        <div class="row">
            <div class="col-12 col-md-6 p-3">
                <h2>Search</h2>
                <div class="mb-3 input-check">
                    <label class="form-label fw-bold" for="keywords">Keywords</label>
                    <input class="form-control" type="text" name="keywords" id="keywords" placeholder="Health Care, Food, Accommodation" minlength="4" required />
                    <p class="form-text mb-0">keywords to search the business in google maps (separated by comma)</p>
                    <p class="error text-danger form-text">type at least one correct keyword</p>
                </div>
                <div class="mb-3 input-check">
                    <label class="form-label fw-bold" for="cities">Cities</label>
                    <input class="form-control" type="text" name="cities" id="cities" placeholder="New York, Chicago Illinois, Charleston South Carolina" minlength="4" required />
                    <p class="form-text mb-0">cities to search the business keywords in google maps (separated by comma)</p>
                    <p class="error text-danger form-text">type at least the full name of one correct city</p>
                </div>

                <div class="mb-3 input-check">
                    <label class="form-label fw-bold" for="max">Max business</label>
                    <input class="form-control" type="number" name="max" id="max" placeholder="100" required min="1" />
                    <p class="form-text mb-0">max business of business to scrape or get data</p>
                    <p class="error text-danger form-text">type a number greater than 0</p>
                </div>
            </div>
            <div class="col-12 col-md-6 p-3">
                <h2>Filters</h2>
                <div class="mb-3 input-check">
                    <label class="form-label" for="min-reviews-note">Min review note</label>
                    <input class="form-control" type="number" name="min-reviews-note" id="min-reviews-note" placeholder="4.5" min="0" max="5" /> 
                    <p class="form-text mb-0">the business with a lower review note than this number will be skipped</p>
                    <p class="error text-danger form-text">type a number between 0 and 5</p>
                </div>
                <div class="mb-3 input-check">
                    <label class="form-label" for="min-reviews-num">Min number of reviews</label>
                    <input class="form-control" type="number" name="min-reviews-num" id="min-reviews-num" placeholder="20" min="0" max="100" />
                    <p class="form-text mb-0">the business with a lower reviews than this number will be skipped</p>
                    <p class="error text-danger form-text">type a number between 0 and 100</p>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="skip-emails">Emails skip</label>
                    <input class="form-control" type="text" name="skip-emails" id="skip-emails" placeholder="darideveloper, support, wix" />
                    <p class="form-text mb-0">the emails with any of this words will not be saved</p>
                </div>
            </div>
        </div>

        <div class="mb-4">
            <h2 class="col-12 mb-3">Save data</h2>
            <p>Select the data to save from each business (select only your required data generate the files faster)</p>
            <div class="row px-3 px-sm-0">
                <div class="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input class="form-check-input" type="checkbox" name="save-emails" id="save-emails" checked column="10" />
                    <label class="form-check-label" for="save-emails">Extract and save email from business website</label>
                </div>
                <div class="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input class="form-check-input" type="checkbox" name="save-name" id="save-name" checked column="3" />
                    <label class="form-check-label" for="save-name">Save business name</label>
                </div>
                <div class="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input class="form-check-input" type="checkbox" name="save-reviews-num" id="save-reviews-num" checked column="4" />
                    <label class="form-check-label" for="save-reviews-num">Save business reviews number</label>
                </div>
                <div class="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input class="form-check-input" type="checkbox" name="save-reviews-note" id="save-reviews-note" checked column="5" />
                    <label class="form-check-label" for="save-reviews-note">Save reviews note</label>
                </div>
                <div class="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input class="form-check-input" type="checkbox" name="save-category" id="save-category" checked column="6" />
                    <label class="form-check-label" for="save-category">Save business category</label>
                </div>
                <div class="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input class="form-check-input" type="checkbox" name="save-location" id="save-location" checked column="7" />
                    <label class="form-check-label" for="save-location">Save business location</label>
                </div>
                <div class="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input class="form-check-input" type="checkbox" name="save-details" id="save-details" checked column="9" />
                    <label class="form-check-label" for="save-details">Save business details</label>
                </div>
                <div class="mb-3 form-check col-12 col-md-3 col-lg-2">
                    <input class="form-check-input" type="checkbox" name="save-web-page" id="save-web-page" checked column="9" />
                    <label class="form-check-label" for="save-web-page">Save business website</label>
                </div>                    
            </div>
        </div>

        <div class="d-flex justify-content-center my-5">
            <button class="btn btn-primary w-25" type="submit">Start</button>
        </div>              
    </form>
    )
}
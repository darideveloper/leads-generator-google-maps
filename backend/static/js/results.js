// query and manage results data
const web_page = window.location.href
const scraping_status_endpoint = `${web_page}/status/`
const status_elem = document.querySelector (".modal-loading > p")
let scraping_status = "Searching..."

async function query_status () {
    // request status if page its loading

    if (is_loading) {
        while (scraping_status != "done") {

            // Get status from api
            const response = await fetch(scraping_status_endpoint)
            const response_json = await response.json()
            scraping_status = response_json["status"]

            // Update status in page
            status_elem.innerHTML = scraping_status

        }

        // Hide spinner
        is_loading = false
        hide_spinner ()
    }
}
query_status ()
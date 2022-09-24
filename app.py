from multiprocessing.connection import wait
from threading import Thread
from flask import Flask, render_template, request
from scraper import MapsScraper

app = Flask(__name__)

@app.get ("/")
def home ():
    return render_template ("index.html")

@app.post ("/")
def start_scraper ():
    # Get from data
    search_keywords = request.form["keywords"].split(",")
    search_cities = request.form["cities"].split(",")
    search_max = int(request.form["max"])
    filter_min_reviews_note = request.form.get("min-reviews-note", 0)
    filter_min_reviews_num = request.form.get("min-reviews-num", 0)
    filter_skip_emails = request.form["skip-emails"]
    save_emails = True if request.form["save-emails"] == "on" else False
    save_name = True if request.form["save-name"] == "on" else False
    save_reviews_num = True if request.form["save-reviews-num"] == "on" else False
    save_reviews_note = True if request.form["save-reviews-note"] == "on" else False
    save_category = True if request.form["save-category"] == "on" else False
    save_location = True if request.form["save-location"] == "on" else False
    save_details = True if request.form["save-details"] == "on" else False
    save_web_page = True if request.form["save-web-page"] == "on" else False
    wait_time = 5
    
    # Organize filters
    filters = {
        
    }
    
    scraper_thread = Thread(target=MapsScraper, args=(
        keywords, 
        cities, 
        max_results, 
        get_emails, 
        show_browser,
        required_data, 
        filters, 
        wait_time
    ))
    
    return render_template ("index.html")

if __name__ == "__main__":
    # Run server with debug
    app.run (debug=True, host="0.0.0.0")
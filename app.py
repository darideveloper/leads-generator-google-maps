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
    save_emails = True if "save-emails" in request.form else False
    save_name = True if "save-name" in request.form else False
    save_reviews_num = True if "save-reviews-num" in request.form else False
    save_reviews_note = True if "save-reviews-note" in request.form else False
    save_category = True if "save-category" in request.form else False
    save_location = True if "save-location" in request.form else False
    save_details = True if "save-details" in request.form else False
    save_web_page = True if "save-web-page" in request.form else False
    wait_time = 5
    
    # Organize filters
    filters = {
        "reviews_number": filter_min_reviews_num,
        "reviews_note": filter_min_reviews_note,
        "skip_emails": filter_skip_emails
    }
    
    # headless
    show_browser = False
    
    # Organize save data
    save_date = {
        "link": True,
        "name": save_name,
        "reviews_number": save_reviews_num,
        "reviews_note": save_reviews_note,
        "category": save_category,
        "location": save_location,
        "details": save_details,
        "web_page": save_web_page
    }
    
    scraper_thread = Thread(target=MapsScraper, args=(
        search_keywords, 
        search_cities, 
        search_max, 
        save_emails, 
        show_browser,
        save_date, 
        filters, 
        wait_time
    ))
    
    return render_template ("index.html")

if __name__ == "__main__":
    # Run server with debug
    app.run (debug=True, host="0.0.0.0")
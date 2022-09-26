import os
import secrets
from threading import Thread
from flask import Flask, render_template, request, send_from_directory
from scraper import MapsScraper
from globals import data, status
from save import SaveData

app = Flask(__name__)
app.secret_key  = secrets.token_hex()

@app.get ("/")
def home ():
    """Home page

    Returns:
        html: html tenplate for home page (index.html)
    """
    return render_template ("index.html")

@app.post ("/")
def start_scraper ():
    """Get form data, start scraper and return results page 

    Returns:
        html: html tenplate for results page (results.html)
    """
    
    # Get from data
    search_keywords = request.form["keywords"].replace (",", " ")
    search_cities = request.form["cities"].split(",")
    search_max = int(request.form["max"])
    filter_min_reviews_note = request.form["min-reviews-note"]
    filter_min_reviews_num = request.form["min-reviews-num"]
    filter_skip_emails = request.form["skip-emails"].split(",")
    save_emails = True if "save-emails" in request.form else False
    save_name = True if "save-name" in request.form else False
    save_reviews_num = True if "save-reviews-num" in request.form else False
    save_reviews_note = True if "save-reviews-note" in request.form else False
    save_category = True if "save-category" in request.form else False
    save_location = True if "save-location" in request.form else False
    save_details = True if "save-details" in request.form else False
    save_web_page = True if "save-web-page" in request.form else False
    wait_time = 5
    
    # Fix filters
    if not filter_min_reviews_note:
        filter_min_reviews_note = "0" 
    
    if not filter_min_reviews_num:
        filter_min_reviews_num = "0"
        
    filter_min_reviews_note = f">= {filter_min_reviews_note}"
    filter_min_reviews_num = f">= {filter_min_reviews_num}"
    
    # Organize filters
    filters = {
        "reviews_number": filter_min_reviews_num,
        "reviews_note": filter_min_reviews_note,
        "skip_emails": filter_skip_emails
    }
    
    # headless
    show_browser = True
    
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
    
    # Instance of maps scraper
    scraper = MapsScraper (
        search_keywords, 
        search_cities, 
        search_max, 
        save_emails, 
        show_browser,
        save_date, 
        filters, 
        wait_time
    )
    
    # Auto run scraper thread
    scraper_thread = Thread(target=scraper.auto_run)
    scraper_thread.start ()
        
    return render_template ("index.html")

@app.get ("/data/")
def get_data ():
    """Get global web scraping data

    Returns:
        json: data already scraped
    """
    return {
        "data": data,
    }
    
@app.get ("/status/")
def get_status ():
    """Return global web scraping status

    Returns:
        json: status of the web scraping
    """
    return {
        "status": status[0],
    }
    
@app.get ("/save/<file_type>")
def get_file (file_type):
    """ Return scraping data in specific file type, and return it

    Args:
        file_type (str): "csv", "xlsx" or "json"

    Returns:
        file: binary file with data saved
    """
    
    # instance of saver
    savedata = SaveData ()
    
    # Downloads folder
    downloads_folder = os.path.join (os.path.dirname (__file__), "files")
    
    if file_type == "csv":
        savedata.csv ()
        
    # Return file
    return send_from_directory(downloads_folder, f"data.{file_type}", as_attachment=True)
        

if __name__ == "__main__":
    # Run server with debug
    app.run (debug=True, host="0.0.0.0")
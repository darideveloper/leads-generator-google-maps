import os
from time import sleep
from config import Config
from scraping_manager.automate import Web_scraping

class MapsScraper (Web_scraping):
    def __init__ (self, keywords, city, max_results, get_emails, show_browser):
        # Class variables
        self.keywords = keywords
        self.city = city
        self.max_results = max_results
        self.get_emails = get_emails
        self.show_browser = show_browser

        # Start scraper
        super().__init__ (headless= not show_browser)

    def __search__ (self):

        # Generate maps url
        search_query = f"{self.keywords}+{self.city}".replace(" ", "+")
        search_page = "https://www.google.com/maps/search/{search_query}/"

        self.set_page (search_page)
        sleep (2)

    def __go_next__ (self):
        pass

    def __extract__ (self):
        pass

    def __send_google_sheets__ (self):
        pass

    def auto_run (self):
        pass




def main (): 

    # Get credentials from config
    credentials = Config ()
    keywords = credentials.get ('keywords')
    city = credentials.get ('city')
    max_results = credentials.get ('max_results')
    get_emails = credentials.get ('get_emails')
    show_browser = credentials.get ('show_browser')

    # Start scraper
    maps = MapsScraper (keywords, city, max_results, get_emails, show_browser)
    maps.auto_run ()

    input ("end?")



if __name__ == "__main__":
    main()
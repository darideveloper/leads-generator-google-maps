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
        """ Open google maps search results """

        # Generate maps url
        search_query = f"{self.keywords}+{self.city}".replace(" ", "+")
        search_page = f"https://www.google.com/maps/search/{search_query}/"

        self.set_page (search_page)
        sleep (2)

    def __check_next__ (self):
        """ Validate if the current results screen have more pages

        Returns:
            bool: True, if more pages in the screen
        """
        return True

    def __go_next__ (self):
        """ Move to next resuslts page """
        pass

    def __extract__ (self):
        """ Get all data in google maps, for the current results screen

        Returns:
            list: list nested with the google maps data
        """
        return []

    def __send_google_sheets__ (self, data:list):
        """ Submit data to google sheet 

        Args:
            data (list): list nested with the google maps data
        """
        pass

    def auto_run (self):
        """ workflow of the scraper """
        self.__search__ ()




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

    print ()



if __name__ == "__main__":
    main()
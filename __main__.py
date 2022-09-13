import os
from time import sleep
from config import Config
from selenium.webdriver.common.by import By
from scraping_manager.automate import Web_scraping

class MapsScraper (Web_scraping):
    def __init__ (self, keywords, city, max_results, get_emails, 
                    show_browser, required_data, filters):

        # Class variables
        self.keywords = keywords
        self.city = city
        self.max_results = max_results
        self.get_emails = get_emails
        self.show_browser = show_browser
        self.filters = filters

        # Save list of required elements
        self.required_data = list(filter (lambda name: required_data[name], required_data))

        # Start scraper
        super().__init__ (headless= not show_browser)

        # List for save the history of the registers scraped
        self.scraped_business = []

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

        registers = []
        selector_results = '[role="feed"] > div'
        results = self.get_elems (selector_results)
        for result in results:

            # css selector for extract data
            selectors = {
                "name": ".NrDZNb .qBF1Pd.fontHeadlineSmall",
                "reviews_number": ".W4Efsd:nth-child(3) span.UY7F9",
                "reviews_note": ".W4Efsd:nth-child(3) span.MW4etd",
                "location": ".W4Efsd:nth-child(4) > div.W4Efsd:nth-child(2)",
                "details": ".W4Efsd:nth-child(4) > div.W4Efsd:nth-child(3)",
                "web_page": ".etWJQ.jym1ob > a.lcr4fd.S9kvJb",
            }

            # Extract the data foe each selector
            row = []
            save_row = True
            for name, selector in selectors.items ():

                # Try to get the current element
                elem_found = False
                try:
                    elem = result.find_element(By.CSS_SELECTOR, selector)
                except:

                    # Go to next register if current is required
                    if name in self.required_data:
                        save_row = False
                        break
                    else:
                        row.append ("")
                else:
                    elem_found = True


                if elem_found:
                    if name == "web_page":
                        # Extract web page link
                        link = elem.get_attribute("href")
                        row.append (link)
                    else:
                        # Extract visible text
                        text = elem.text

                        # Clean text and save
                        text = text.replace ("(", "").replace(")", "")
                        row.append(text)

                    # Save current business as scraped
                    if name == "name":
                        self.scraped_business.append (text)
            
            # save current row
            if save_row:
                
                # Validate user filters
                reviews_number_text = self.filters["reviews_number"]
                reviews_note_text = self.filters["reviews_note"]
                reviews_number_filter = f"{row[1]} {reviews_number_text}"
                reviews_note_filter = f"{row[2]} {reviews_note_text}"

                if eval(reviews_number_filter) and eval(reviews_note_filter):
                    registers.append (row)
    
        return registers

    def __send_google_sheets__ (self, data:list):
        """ Submit data to google sheet 

        Args:
            data (list): list nested with the google maps data
        """
        pass

    def auto_run (self):
        """ workflow of the scraper """
        self.__search__ ()
        data = self.__extract__ ()

def main (): 

    # Get general credentials credentials from config
    credentials = Config ()
    keywords = credentials.get ('keywords')
    city = credentials.get ('city')
    max_results = credentials.get ('max_results')
    get_emails = credentials.get ('get_emails')
    show_browser = credentials.get ('show_browser')
    required_data = credentials.get ('required_data')
    filters = credentials.get ('filters')

    # Start scraper
    maps = MapsScraper (keywords, city, max_results, get_emails, 
                        show_browser, required_data, filters)
    maps.auto_run ()

    print ()



if __name__ == "__main__":
    main()
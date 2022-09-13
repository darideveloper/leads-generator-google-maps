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

        # Results row selector
        self.selector_results_wrapper = '[role="feed"]'
        self.selector_results = f'{self.selector_results_wrapper} > div'

        # History of business scraped
        self.business_names = []

        # Data extracted
        self.registers = []

    def __search__ (self):
        """ Open google maps search results """

        # print status
        print (f"Searching '{self.keywords}' in place '{self.city}'...")

        # Generate maps url
        search_query = f"{self.keywords}+{self.city}".replace(" ", "+")
        search_page = f"https://www.google.com/maps/search/{search_query}/"

        self.set_page (search_page)
        sleep (3)

        # print status
        print ("Scraping data in google maps...")

    def __load_next_results__ (self):
        """ Scroll for load the next results page

        Returns:
            bool: True, if there are not more results
        """
        
        # self.scroll (self.selector_results_wrapper, 0, 600)
        self.go_bottom (self.selector_results_wrapper)
        sleep (5)
        self.refresh_selenium ()

    def __extract__ (self):
        """ Get all data in google maps, for the current results screen

        Returns:
            list: list nested with the google maps data
        """

        results = self.get_elems (self.selector_results)
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

                        # Validate current bussiness in history
                        if name=="name":
                            if text in self.business_names:
                                # Skip business
                                save_row = False
                                break

                            else:
                                # Save in history
                                self.business_names.append (text)
                
            # save current row
            if save_row:
                
                # Validate user filters
                reviews_number_text = self.filters["reviews_number"]
                reviews_note_text = self.filters["reviews_note"]
                reviews_number_filter = f"{row[1].replace(',', '')} {reviews_number_text}"
                reviews_note_filter = f"{row[2].replace(',', '')} {reviews_note_text}"

                if eval(reviews_number_filter) and eval(reviews_note_filter):

                    # Save current row
                    self.registers.append (row)

                    # print status
                    print (f"\t{len(self.registers)} / {self.max_results}...")
    
            # End scraper when found the requied data
            if len (self.registers) == self.max_results:
                break

    def __send_google_sheets__ (self, data:list):
        """ Submit data to google sheet 

        Args:
            data (list): list nested with the google maps data
        """
        # print status
        print (f"Sending data to google sheets...")
        pass

    def auto_run (self):
        """ workflow of the scraper """
        self.__search__ ()

        # Main scraping loop 
        while True:

            last_registers = len (self.registers)

            # Scrape current page
            self.__extract__ ()

            new_registers = len (self.registers)

            # End scraping where no more registers found
            if last_registers == new_registers:
                break

            # Load more results
            self.__load_next_results__ ()

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



if __name__ == "__main__":
    main()
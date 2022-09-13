import os
import re
import csv
from tqdm import tqdm
from time import sleep
from config import Config
from selenium.webdriver.common.by import By
from scraping_manager.automate import Web_scraping
from spreadsheet_manager.google_ss import SSManager

class MapsScraper (Web_scraping):
    def __init__ (self, keywords, city, max_results, get_emails, show_browser,
                    required_data, filters, google_sheet_link, google_sheet_name):

        # Class variables
        self.keywords = keywords
        self.city = city
        self.max_results = max_results
        self.get_emails = get_emails
        self.show_browser = show_browser
        self.filters = filters
        self.google_sheet_link = google_sheet_link
        self.google_sheet_name = google_sheet_name


        # Save list of required elements
        self.required_data = list(filter (lambda name: required_data[name], required_data))

        # Start scraper
        super().__init__ (headless= not show_browser)

        # Results row selector
        self.selector_results_wrapper = '[role="feed"]'
        self.selector_results = f'{self.selector_results_wrapper} > div'

        # History of business scraped
        self.business_links = []

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

    def __extract_maps__ (self):
        """ Get all data in google maps, for the current results screen

        Returns:
            list: list nested with the google maps data
        """

        results = self.get_elems (self.selector_results)
        for result in results:

            # css selector for extract data
            selectors = {
                "link": 'a[href^="https://www.google.com"]',
                "name": ".NrDZNb .qBF1Pd.fontHeadlineSmall",
                "reviews_number": ".W4Efsd:nth-child(3) span.UY7F9",
                "reviews_note": ".W4Efsd:nth-child(3) span.MW4etd",
                "category": ".W4Efsd:nth-child(4) > div.W4Efsd:nth-child(2) > span:nth-child(1)",
                "location": ".W4Efsd:nth-child(4) > div.W4Efsd:nth-child(2) > span:nth-child(2)",
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
                    if name in ["web_page", "link"]:
                        # Extract web page link
                        link = elem.get_attribute("href")
                        row.append (link)

                        # Validate current bussiness in history
                        if name=="link":
                            if link in self.business_links:
                                # Skip business
                                save_row = False
                                break

                            else:
                                # Save in history
                                self.business_links.append (link)
                    else:
                        # Extract visible text
                        text = elem.text

                        # Clean text and save
                        text = text.replace ("(", "").replace(")", "").replace ("· ", "")
                        row.append(text)
                
            # save current row
            if save_row:
                
                # Validate user filters
                reviews_number_text = self.filters["reviews_number"]
                reviews_note_text = self.filters["reviews_note"]
                reviews_number_filter = f"{row[2].replace(',', '')} {reviews_number_text}"
                reviews_note_filter = f"{row[3].replace(',', '')} {reviews_note_text}"

                if eval(reviews_number_filter) and eval(reviews_note_filter):

                    # Save current row
                    self.registers.append (row)

                    # print status
                    print (f"\t{len(self.registers)} / {self.max_results}...")
    
            # End scraper when found the requied data
            if len (self.registers) == self.max_results:
                break

    def __extract_emails__ (self):

        # Loop for each register
        print ("Scraping emails from web pages...")
        for register in tqdm(self.registers):
            
            # Get wehb page
            web_page = register[-1]

            # Try to open page
            try:
                self.set_page (web_page)
            except: 
                continue
            html_code = self.driver.page_source
            
            # Get emails with re
            regex_email = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
            emails = regex_email.findall (html_code)
            if emails:
                emails = ",".join (emails)
            else:
                emails = ""

            # save emails
            register.append (emails)

    def __save_data__ (self):
        """ Submit data to google sheet and save in local csv 

        Args:
            data (list): list nested with the google maps data
        """
        # print status
        print (f"Sending data to google sheets...")

        current_folder = os.path.dirname(__file__)
        
        # Connect to google sheets
        credentials_path = os.path.join(current_folder, "spreadsheet_manager", "credentials.json")
        ss = SSManager (self.google_sheet_link, credentials_path, self.google_sheet_name)

        # Add header to registers
        header = ["Link", "Name", "Reviews num", "Reviews note", "Category", "Location", "Details", "Web page", "Emails"]
        self.registers.insert (0, header)
        
        # Send data cleaning sheet
        ss.write_data (self.registers, clear_sheet=True) 

        # Save in csv
        print (f"Saving data to csv...")
        csv_path = os.path.join(current_folder, "data.csv")
        with open (csv_path, "w", encoding='utf-8', newline='') as file:
            csv_writer = csv.writer(file)
            csv_writer.writerows (self.registers)

    def auto_run (self):
        """ workflow of the scraper """
        self.__search__ ()

        # Main scraping loop 
        while True:

            last_registers = len (self.registers)

            # Scrape current page
            self.__extract_maps__ ()

            new_registers = len (self.registers)

            # End scraping where no more registers found
            if last_registers == new_registers:
                break

            # Load more results
            self.__load_next_results__ ()

        # Extract emails data
        if self.get_emails:
            self.__extract_emails__ ()

        self.__save_data__ ()

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
    google_sheet_link = credentials.get ('google_sheet_link')
    google_sheet_name = credentials.get ('google_sheet_name')

    # Start scraper
    maps = MapsScraper (keywords, city, max_results, get_emails, show_browser,
                        required_data, filters, google_sheet_link, google_sheet_name)
    maps.auto_run ()

if __name__ == "__main__":
    main()
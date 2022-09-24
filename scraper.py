import os
import re
import csv
import requests
from tqdm import tqdm
from time import sleep
from selenium.webdriver.common.by import By
from scraping_manager.automate import Web_scraping

class MapsScraper (Web_scraping):
    def __init__ (self, keywords, cities, max_results, get_emails, show_browser,
                    save_data, filters, wait_time):

        # Class variables
        self.keywords = keywords
        self.cities = cities
        self.max_results = max_results
        self.get_emails = get_emails
        self.headless = not show_browser
        self.filters = filters
        self.wait_time = wait_time

        # Save list of required elements
        self.save_data = list(filter (lambda name: save_data[name], save_data))

        # Start scraper
        super().__init__ (headless=self.headless)

        # Results row selector
        self.selector_results_wrapper = '[role="feed"]'
        self.selector_results = f'{self.selector_results_wrapper} > div'

        # History of business scraped
        self.business_links = []

        # Data extracted
        self.registers = []

        # Counter of registers extracted for each city
        self.counter_registers = 0

    def __search__ (self, city):
        """ Open google maps search results """

        # print status
        print (f"Searching '{self.keywords}' in place '{city}'...")

        # Generate maps url
        search_query = f"{self.keywords}+{city}".replace(" ", "+")
        search_page = f"https://www.google.com/maps/search/{search_query}/"

        self.set_page (search_page)
        sleep (3)

        # print status
        print ("Scraping data in google maps...")

        # Reset extracted counter
        self.counter_registers = 0

    def __load_next_results__ (self):
        """ Scroll for load the next results page

        Returns:
            bool: True, if there are not more results
        """
        
        # self.scroll (self.selector_results_wrapper, 0, 600)
        self.go_bottom (self.selector_results_wrapper)
        self.go_down (self.selector_results_wrapper)
        sleep (7)
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
            
            # clean unnecesary selectors
            for name, selector in selectors:
                if name in self.save_data:
                    selectors[name] = selector
                else:
                    selectors[name] = None
                    

            # Extract the data foe each selector
            row = []
            save_row = True
            for name, selector in selectors.items ():
                
                # Skip empty selectors
                if not selector:
                    row.append ("")                    

                # Try to get the current element
                elem_found = False
                try:
                    elem = result.find_element(By.CSS_SELECTOR, selector)
                except:
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

                    self.counter_registers += 1

                    # print status
                    print (f"\t{self.counter_registers} / {self.max_results}...")
    
            # End scraper when found the requied data
            if self.counter_registers == self.max_results:
                break

    def __get_emails_html__ (self, html_code):
        """ Get the email from current html code

        Args:
            html_code (str): html strcuture of a page

        Returns:
            list(
                bool: true if the emails have been found in the page
                str: list of emails separated by comma
            )
        """

        # Get emails with re
        regex_email = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
        emails = regex_email.findall (html_code)


        if emails:
            # Filter emails with config
            emails_filtered = []
            emails_found = True
            skip_emails = self.filters["skip_emails"]
            for email in emails:
                save_email = True
                for skip_email in skip_emails:
                    if skip_email in email:
                        save_email = False
                        break
                
                if save_email:
                    emails_filtered.append (email)

            
            # Format emails
            emails_filtered_text = ",".join (emails_filtered)
        else:
            emails_found = False
            emails_filtered_text = ""

        return [emails_found, emails_filtered_text]

    def __extract_emails__ (self):

        """ Requests pages or open with selenium for the emails
        """

        # Close current browser
        self.kill ()

        # Start scraper again
        super().__init__ (headless=self.headless, time_out=self.wait_time)

        # Loop for each register
        print ("Scraping emails from web pages...")
        pages_counter = 0
        for register in tqdm(self.registers):

            emails = []

            # Incress counter
            pages_counter += 1
            
            # Get web page
            web_page = register[-1]

            # Http requests to the page, for make sure that exist
            try:
                res = requests.get (web_page, timeout=self.wait_time)
            except:
                continue
            status_code = res.status_code

            # Only load working poges
            if status_code == 200:

                # Get page content with requests
                html_code = res.text

                # get emails from requests
                emails_found, emails = self.__get_emails_html__ (html_code)
                if not emails_found:

                    # Get page content with selenium
                    try:
                        self.set_page (web_page)
                        html_code = self.driver.page_source
                    except: 
                        continue
                    
                    # Get and same emails with selenium
                    emails_found, emails = self.__get_emails_html__ (html_code)

                    # Restart browser
                    if pages_counter % 10 == 0:
                        self.kill ()
                        super().__init__ (headless=self.headless, time_out=self.wait_time)

            if emails:
                # save emails from requests
                register.append (emails)

    def __save_data__ (self):
        """ Submit data to google sheet and save in local csv 

        Args:
            data (list): list nested with the google maps data
        """
        # print status
        # print (f"Sending data to google sheets...")

        current_folder = os.path.dirname(__file__)
        
        # Add header to registers
        header = ["Link", "keywords", "Cities", "Name", "Reviews num", "Reviews note", "Category", "Location", "Details", "Web page", "Emails"]
        self.registers.insert (0, header)

        # Save in csv
        print (f"Saving data to csv...")
        csv_path = os.path.join(current_folder, "data.csv")
        with open (csv_path, "w", encoding='utf-8', newline='') as file:
            csv_writer = csv.writer(file)
            csv_writer.writerows (self.registers)

    def auto_run (self):
        """ workflow of the scraper """

        # Loop for each city
        for city in self.cities:

            # Search the current city
            self.__search__ (city)

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
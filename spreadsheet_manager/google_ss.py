#! python3
# Conect to google spreadsheets
import os
import gspread
from time import sleep
from oauth2client.service_account import ServiceAccountCredentials

class SSManager (): 
    """ Class to conect to google shets and upload data"""

    def __init__ (self, google_sheet_link, creds_path, sheet_name=None): 
        """ Construtor of the class"""

        # Read credentials
        if not os.path.isfile (creds_path):
            raise FileNotFoundError ("The credential file path is not correct")
        
        scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
        creds = ServiceAccountCredentials.from_json_keyfile_name(creds_path, scope)
        client = gspread.authorize(creds)

        # Conect to google sheet
        sheet = client.open_by_url(google_sheet_link)

        # Set the sheet 1 as worksheet
        if sheet_name:
            self.worksheet = sheet.worksheet(sheet_name)
        else:
            self.worksheet = sheet.sheet1

    def write_cell (self, value, row=1, column=1):
        """ Write data in specific cell 
        """
        self.worksheet.update_cell(row, column, value)

    def write_data (self, data, row=1, column=1, clear_sheet=False): 
        """ Write list of data in the worksheet"""

        if clear_sheet:
            self.worksheet.clear ()
        
        # check if data exist
        if not data: 
            print ("THERE IS NO NEW INFORMATION TO WRITE IN THE FILE.")
        else:

            # Loop for each row of data
            for row_data in data: 

                # Set the position of the next row. Omit the header
                row_index = data.index(row_data) + row
                
                for cell in row_data:
                    column_index = row_data.index (cell) + column

                    # Write data in gss
                    # print (row_index, column_index, cell)
                    self.write_cell (cell, row_index, column_index)
                    sleep (1)

    def get_data (self): 
        """ Read all records of the sheet"""

        records = self.worksheet.get_all_records()
        return records


import os
import csv
from globals import data, status

class SaveData ():
    def __init__ (self):
        current_folder = os.path.dirname(__file__)
        self.files_folder = os.path.join (current_folder, "files")
    
    def csv (self):
        """ Save data in csv local file
        """

        # Save in csv
        print (f"Saving data to csv...")
        csv_path = os.path.join(self.files_folder, "data.csv")
        with open (csv_path, "w", encoding='utf-8', newline='') as file:
            csv_writer = csv.writer(file)
            csv_writer.writerows (data)
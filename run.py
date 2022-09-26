import os
import webbrowser
from threading import Thread
from app import app

def open_page ():
    current_folder = os.path.dirname(__file__)
    loading_path = os.path.join(current_folder, 'templates', 'loading.html')
    webbrowser.open (loading_path)
    print ("openning page")
    

if __name__ == "__main__":
    # Create threadsg
    thread_open_page = Thread (target=open_page)
    
    # Run threads
    thread_open_page.start ()
    
    # Run server without debug
    app.run (host="0.0.0.0")
    
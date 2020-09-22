
import urllib.parse, json, http
import requests
from flask import Flask
from flask import render_template

def find():
    url = "http://api.open-notify.org/iss-now.json"
    json_data = requests.get(url).json()
    return json_data

def show_iss_coordinates():
    data = find()
    if(data['message']=='success'):
        return data['iss_position']





app = Flask(__name__)

@app.route("/")
def index():
    return render_template("./index.html")

@app.route("/api/iss")
def get_iss():
   return show_iss_coordinates()

if __name__ == '__main__':
    app.run()

import urllib.parse, json, http
import requests
from flask import Flask
from flask import render_template

def get_iss_info():
    url = "http://api.open-notify.org/iss-now.json"
    json_data = requests.get(url).json()
    return json_data

app = Flask(__name__)

@app.route("/")
def index():
    iss_coordinates = show_iss_coordinates()
    return render_template("./index.html", iss_coordinates=iss_coordinates)

@app.route("/api/iss")
def show_iss_coordinates():
    data = get_iss_info()
    if(data['message']=='success'):
        return data['iss_position']

if __name__ == '__main__':
    app.run()
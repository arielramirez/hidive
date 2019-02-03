from flask import Flask, render_template
import os
import socket

app = Flask(__name__, static_folder="static", template_folder="static")

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/hello")
def hello():
  return "Hello World!"

if __name__ == "__main__":
  app.run(debug=False,host='0.0.0.0', port=80)

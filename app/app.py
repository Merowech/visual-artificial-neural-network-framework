# Import flask and template operators
from flask import Flask, render_template, request

# Import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

# Import nn stuff
from app.models import jsontonn

# Define the WSGI application object
app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/nnlayout', methods=['GET', 'POST'])
def nnlayout():
    converter = jsontonn.JSONToNN()
    converter.convert(request.get_json())
    return 'Hello World'

# Error 404
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

# Configurations
app.config.from_object('app.config')

def run():
    # Run the app
    app.run(host='0.0.0.0', port=8080)

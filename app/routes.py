from flask import render_template, jsonify
from app import app
import tickets

@app.route('/')
def main():
	return render_template('index.html', title='home')

@app.route('/index')
def index():
	return "Hello world"
	return render_template('index.html', title='Home')


@app.route('/locations')
def getTix():
	return jsonify(tickets.getLocationData())

	
@app.route('/zipcodes')
def zip_codes():
	return jsonify(tickets.getZipCodeData())

from app import app
import requests
import json


def getLocationData(): #Goes to URL, makes AJAX request
	url = "https://data.cityofnewyork.us/resource/qiz3-axqb.json?$limit=666&$$APP_TOKEN=nYhSiVxtPuZrvzgtZpAV1m64q"
	print ("fetching requests")
	r = requests.get(url)
	locationList = []
	data = r.json()
	for shit in data:
		if 'location' in shit: 
			locationList.append(shit['location'].get('coordinates'))
	print((str(len(locationList))) + " incidents fetched")
	return locationList


def getZipCodeData():
	url = "https://data.cityofnewyork.us/resource/qiz3-axqb.json?$limit=2500&$$APP_TOKEN=nYhSiVxtPuZrvzgtZpAV1m64q"
	print ("fetching requests")
	r = requests.get(url)
	streetDataList = []
	data = r.json()
	for shit in data:
		if 'zip_code' in shit:
			streetDataList.append(int(shit.get('zip_code')))
	streetDataList.sort()
	print(str(len(streetDataList))+ " zip codes")
	return streetDataList



#a = getData()
#print ('Printing JSON:\n'+a)	

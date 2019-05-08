import os

from flask import Flask, redirect, url_for, request, render_template, current_app, jsonify
from pymongo import MongoClient
from flask_cors import CORS

import json
import logging

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

client = MongoClient('mongo', 27017)
db = client.tododb


@app.route('/')
def index():
  _items = db.tododb.find()
  items = [item for item in _items]
  return render_template('index.html', items=items)

 
@app.route('/new', methods=['POST'])
def new():
  item_doc = {
    'name': request.form['name'],
    'description': request.form['description']
  }
  db.tododb.insert_one(item_doc)
  print("Added something")
  return redirect(url_for('index'))

@app.route('/getData', methods=['POST'])
def getData():
  current_app.logger.info("getData called with data")
  _items = db.tododb.find({},{ "_id": 0, "name": 1, "description": 1 })
  items = [item for item in _items]
  returnList = {"hits": []}
  returnList["hits"] = items
  current_app.logger.info(items)
  current_app.logger.info(json.dumps(items))
  current_app.logger.info(jsonify(items))
  current_app.logger.info(returnList)
  response = jsonify(returnList)
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response


if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)

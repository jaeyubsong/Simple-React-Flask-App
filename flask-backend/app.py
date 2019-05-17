import os



from flask import Flask, flash, session, redirect, url_for, request, render_template, current_app, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

import json
import logging


UPLOAD_PATH = '../Simple-React-Flask-App/toUpload'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

client = MongoClient('mongo', 27017)
db = client.tododb


@app.route('/')
def index():
  _items = db.tododb.find()
  items = [item for item in _items]
  return render_template('index.html', items=items)

 
@app.route('/new', methods=['POST', 'GET'])
def new():
  item_doc = {
    'name': request.form['name'],
    'description': request.form['description']
  }
  db.tododb.insert_one(item_doc)
  print("Added something")
  return redirect(url_for('index'))


@app.route('/delete', methods=['POST'])
def delete():
  name_to_delete = request.form['name_to_delete']
  db.tododb.remove({"name": name_to_delete })
  print("\nDelete Successfully\n")
  return redirect('/')


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


@app.route('/upload', methods=['GET', 'POST'])
def fileUpload():
  if request.method == 'POST':
    toUpload = request.files['toUpload']
    current_app.logger.info(toUpload.filename)
    toUpload.save(secure_filename(toUpload.filename))
    return 'upload successfully'
  

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)

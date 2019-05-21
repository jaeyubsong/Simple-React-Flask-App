import os
from flask import Flask, flash, session, redirect, url_for, request, render_template, current_app, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from flask_restplus import Api, Resource

import json
import logging


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
api = Api(app=app)
ns = api.namespace('vbs', description='design vbs web')

client = MongoClient('mongo', 27017)
db = client.tododb

@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
@ns.route("/")
class indexClass(Resource):
  def post(self):
    _items = db.tododb.find()
    items = [item for item in _items]
    return render_template('index.html', items=items)

@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
@ns.route("/new")
class newClass(Resource):
  def put(self):
    item_doc = {
      'name': request.form['name'],
      'description': request.form['description']
    }
    db.tododb.insert_one(item_doc)
    print("Added something")
    return redirect(url_for('index'))

@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
@ns.route("/delete")
class deleteClass(Resource):
  def delete(self):
    name_to_delete = request.form['name_to_delete']
    db.tododb.remove({"name": name_to_delete })
    print("\nDelete Successfully\n")
    return redirect('/')

@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
@ns.route("/getData")
class getDataClass(Resource):
  def post(self):
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
    #response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
@ns.route("/upload")
class fileUpload(Resource):
  def post(self):
   # if request.method == 'POST':
    toUpload = request.files['toUpload']
    current_app.logger.info(toUpload.filename)
    toUpload.save(secure_filename(toUpload.filename))
    return 'upload successfully'
 
#@app.after_request
#def after_request(response):
#  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#  response.headers.add('Access-Contorl-Allow-Credentials', 'true')
#  return response

#@app.route("/")
##class indexClass(Resource):
#def index():
#  _items = db.tododb.find()
#  items = [item for item in _items]
#  return render_template('index.html', items=items)


#@app.route("/new", methods=['POST', 'GET'])
##class newClass(Resource):
#def new():
#  item_doc = {
#    'name': request.form['name'],
#    'description': request.form['description']
#  }
#  db.tododb.insert_one(item_doc)
#  print("Added something")
#  return redirect(url_for('index'))


#@app.route("/delete", methods=['POST'])
##class deleteClass(Resource):
#def delete():
#  name_to_delete = request.form['name_to_delete']
#  db.tododb.remove({"name": name_to_delete })
#  print("\nDelete Successfully\n")
#  return redirect('/')


#@app.route("/getData", methods=['POST'])
#@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
##class getDataClass(Resource):
#def getData():
#  current_app.logger.info("getData called with data")
#  _items = db.tododb.find({},{ "_id": 0, "name": 1, "description": 1 })
#  items = [item for item in _items]
#  returnList = {"hits": []}
#  returnList["hits"] = items
#  current_app.logger.info(items)
#  current_app.logger.info(json.dumps(items))
#  current_app.logger.info(jsonify(items))
#  current_app.logger.info(returnList)
#  response = jsonify(returnList)
#  #response.headers.add('Access-Control-Allow-Origin', '*')
#  return response


#@app.route("/upload", methods=['POST', 'GET'])
#@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
##class fileUpload(Resource):
#def fileUpload():
#  if request.method == 'POST':
#    toUpload = request.files['toUpload']
#    current_app.logger.info(toUpload.filename)
#    toUpload.save(secure_filename(toUpload.filename))
#    return 'upload successfully'

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)

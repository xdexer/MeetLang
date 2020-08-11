import pymongo
import json
from flask import Flask, request

class UsersDatabase:
    host = 'mongodb+srv://user0:haslo1@cluster0.fl0ij.azure.mongodb.net/test?authSource=admin&r' + \
    'eplicaSet=atlas-nmj44l-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true'
    port = 27017
    client = pymongo.MongoClient(host, port)
    users_database = client.UsersDatabase
    users_collection = users_database.Users
    users_tags_collection = users_database.UsersTags

    @staticmethod
    def add_new_user(new_user):
        if(UsersDatabase.users_collection.find_one(new_user) == None):
            UsersDatabase.users_collection.insert_one(new_user).inserted_id
            UsersDatabase.users_tags_collection.insert_one({"email": new_user["email"]}).inserted_id
            return True
        else:
            return False
    @staticmethod
    def get_existing_user(searched_user):
        return UsersDatabase.users_collection.find_one(searched_user)
    @staticmethod
    def get_users_tags(user):
        return UsersDatabase.users_tags_collection.find_one(user)
    #@staticmethod
    #def get_multiple_existing_users(searched_users):
    #   return UsersDatabase.users_collection.find(searched_users)
    @staticmethod
    def update_user(preview, after):
        UsersDatabase.users_collection.update_one(preview, after)
    @staticmethod
    def update_user_tags(preview, after):
        UsersDatabase.users_tags_collection.update_one(preview, after)

app = Flask(__name__)

@app.route('/AddNewUser', methods = ['POST'])
def AddNewUser():
    data = request.json
    if(data == None):
        return "Invalid input."
    if(UsersDatabase.add_new_user(data) == True):
        return "Added succesfully."
    else:
        return "Entry already exists."

@app.route('/LoginUser', methods = ['POST'])
def LoginUser():
    data = request.json
    if(data == None):
        return "Invalid input."
    user = UsersDatabase.get_existing_user({"email":data["email"]})
    if(user == None):
        return "User doesn't exist."
    elif(user["password"] != data["password"]):
        return "Invalid password."
    else:
        user_online = { "$set": { "status": "online" } }
        UsersDatabase.update_user(user, user_online)
        return "User logged in."

@app.route('/AddTags', methods = ['POST'])
def AddTags():
    data = request.json
    if(data == None):
        return "Invalid input."
    #user = UsersDatabase.get_existing_user({"email":data["email"]})
    tags = UsersDatabase.get_users_tags({"email":data["email"]})
    if(tags == None):
        return "User doesn't exist."
    else:
        updated_tags = {"$set": data}
        UsersDatabase.update_user_tags(tags, updated_tags)
        return "User's tags have got updated."
    

app.run(port=5000)
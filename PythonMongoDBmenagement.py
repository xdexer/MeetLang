import pymongo
import json
from flask import Flask, request
from enum import Enum

class UsersDatabase:
    host = 'mongodb+srv://userAdmin:passAdmin@cluster0.fl0ij.azure.mongodb.net/test?authSource=admin&' + \
    'replicaSet=atlas-nmj44l-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true'
    port = 27017
    client = pymongo.MongoClient(host, port)
    users_database = client.UsersDatabase
    users_collection = users_database.Users
    users_tags_collection = users_database.UsersTags

    @staticmethod
    def return_user_info(user):
        user_info = {}
        for key in user:
            if(key != "_id"):
                user_info[key] = user[key]
        return user_info
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

class ClientServerInteractionStatus(Enum):
    WrongInput = -1
    Fail = 0
    Succes = 1

app = Flask(__name__)

@app.route('/AddNewUser', methods = ['POST'])
def AddNewUser():
    data = request.json
    if(data == None):
        return {"Interaction status":str(ClientServerInteractionStatus.WrongInput.value)}
    if(UsersDatabase.add_new_user(data) == True):
        return {"Interaction status":str(ClientServerInteractionStatus.Succes.value)}
    else:
        return {"Interaction status":str(ClientServerInteractionStatus.Fail.value)}

@app.route('/LoginUser', methods = ['POST'])
def LoginUser():
    data = request.json
    if(data == None):
        return {"Interaction status":str(ClientServerInteractionStatus.WrongInput.value)}
    user = UsersDatabase.get_existing_user({"email":data["email"]})
    if(user == None):
        return {"Interaction status":str(ClientServerInteractionStatus.Fail.value)}
    elif(user["password"] != data["password"]):
        return {"Interaction status":str(ClientServerInteractionStatus.Fail.value)}
    else:
        user_online = { "$set": { "status": "online"} }
        UsersDatabase.update_user(user, user_online)
        return UsersDatabase.return_user_info(user)

@app.route('/AddTags', methods = ['POST'])
def AddTags():
    data = request.json
    if(data == None):
        return {"Interaction status":str(ClientServerInteractionStatus.WrongInput.value)}
    #user = UsersDatabase.get_existing_user({"email":data["email"]})
    tags = UsersDatabase.get_users_tags({"email":data["email"]})
    if(tags == None):
        return {"Interaction status":str(ClientServerInteractionStatus.Fail.value)}
    else:
        updated_tags = {"$set": data}
        UsersDatabase.update_user_tags(tags, updated_tags)
        return {"Interaction status":str(ClientServerInteractionStatus.Succes.value)} 

app.run(port=5000)
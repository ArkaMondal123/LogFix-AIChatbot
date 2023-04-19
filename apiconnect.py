
#C:\Users\arkam\Desktop\URJA\apiconnect.py

#importing external functions
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pymongo

#importing internal functions
from functions import remove_unique_key, email_log
from chatbot import chatbot


client = pymongo.MongoClient(f"mongodb+srv://Martianbot:{password}@clustermartianbot.erq2f.mongodb.net/logfix?retryWrites=true&w=majority")
db = client['logfix']
collection = db["solved"]
colunsolved = db["unsolved"]


app = Flask(__name__)
cors = CORS(app)

@app.route('/main/<query>/', methods = ['GET', 'POST'])
@cross_origin(orgin = '*')
def main(query):
    reply = chatbot(query)
    #jic an error happens
    if reply[0] != 785 and reply[0] != 145:
        return jsonify({'code' : 200, 'reply' : [reply], 'query' : query})
    else:
        return jsonify({'code' : 785, 'reply' : reply[1], 'query' : query})

@app.route('/send_email/<email>/<query>', methods = ['GET', 'POST'])
@cross_origin(orgin = '*')
def email(email, query):
    email_log(query, email)
    return jsonify({'code': 200})


#AGENT SIDE CODE

@app.route('/resolve/<queryID>/<answer>/<alt_qs>/', methods = ['GET', 'POST'])
@cross_origin(orgin = '*')
def resolve(queryID, answer, alt_qs):
    #import pdb; pdb.set_trace()
    try:
        raw_data = colunsolved.find_one({"_id" : queryID})
        query = raw_data['query']
        alt_qs = alt_qs.split("|")
        alt_qs.append(query)
        final_list = collection.find_one()["intents"]
        final_list.append({"qn" : alt_qs, "ans" : answer})
        collection.update_one({'_id' : 0}, {'$set' : {'intents' : final_list}})
        colunsolved.delete_one({'_id' : queryID})
        remove_unique_key(queryID)
        return jsonify({'status' : 'Good'})
    except ImportError:
        return jsonify({'status' : "Error: Import ERROR"})
    finally:
        return jsonify({'status': "Error: Key is not active"})

@app.route('/question/<queryID>', methods = ['GET', 'POST'])
@cross_origin()
def question(queryID):
    try:
        raw_data = colunsolved.find_one({"_id" : queryID})
        query = raw_data['query']
        return jsonify({'query' : query})
    except:
        return jsonify({'status' : 'Error: Key is not active'})

if __name__ == '__main__':
    app.run(debug = True)

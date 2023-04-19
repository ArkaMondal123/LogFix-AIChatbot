import pymongo

client = pymongo.MongoClient(f"mongodb+srv://Martianbot:{password}@clustermartianbot.erq2f.mongodb.net/logfix?retryWrites=true&w=majority")
db = client['logfix']
solved = db["solved"]

intents = solved.find_one({'_id' : 0})['intents']

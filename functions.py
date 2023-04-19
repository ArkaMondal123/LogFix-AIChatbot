

#importing external functions
import pymongo
import random
import numpy as np

password = "martian.bot"
client = pymongo.MongoClient(f"mongodb+srv://Martianbot:{password}@clustermartianbot.erq2f.mongodb.net/logfix?retryWrites=true&w=majority")
db = client['logfix']

def remove_unique_key(ID):
    collection = db["activekeys"]
    keys = collection.find_one()["li"]
    keys.remove(ID)
    collection.update_one({'_id' : 0}, {'$set' : {"li" : keys}})
    return ID

def unique_key():
    import string
    collection = db["activekeys"]
    keys = collection.find_one()["li"]
    while True:
        key = ''.join(random.choices(string.ascii_letters, k=7))
        if key not in keys:
            break
    keys.append(key)
    collection.update_one({'_id' : 0}, {'$set' : {"li" : keys}})
    return key


def email_log(query, semail):
    status = True
    collection = db["unsolved"]

    #initialize unique key
    key = unique_key()

    #email
    import smtplib, ssl

    port = 587  # For starttls
    smtp_server = "smtp.office365.com"
    sender_email = "querysolverlogfix@outlook.com"
    receiver_email = "logfix076@gmail.com"
    password = "logfix#1234"
    message = f"""\n\n
    Query from {semail}

    Query : {query}

    Query ID : {key}"""

    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)

    #query launch in database
    launch_query = {'_id' : key, 'query' : query, 'email' : semail}
    collection.insert_one(launch_query)

    #
    return status

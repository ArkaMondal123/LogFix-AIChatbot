
#C:\Users\arkam\Desktop\URJA\chatbot.py

#importing internal modules
from functions import email_log
import datetime

#importing external modules
import numpy as np
import spacy
import pymongo

nlp = spacy.load('en_core_web_lg')
match_thr = 0.80

def normalize_message(message):
    import string
    spacy_en_stop_words = np.array(nlp.Defaults.stop_words)
    message = u' '.join(message.translate(dict((ord(char), u' ') for char in string.punctuation)).lower().split())
    x = message.split()
    for i in x:
        if i in spacy_en_stop_words:
            x.remove(i)
    return " ".join(x)

def chatbot(msg):
    client = pymongo.MongoClient(f"mongodb+srv://Martianbot:{password}@clustermartianbot.erq2f.mongodb.net/logfix?retryWrites=true&w=majority")
    db = client['logfix']
    solved = db["solved"]

    intents = solved.find_one({'_id' : 0})['intents']

    resp = {}
    asked = normalize_message(msg).strip()
    doc = nlp(asked)
    if not (doc.vector_norm):
        print(asked)
        return (145, 'error', asked)
    for intent in intents:
        for question in intent["qn"]:
            qn = normalize_message(question).strip()
            if qn.split() == []:
                continue
            doc1 = nlp(qn)
            if not (doc1.vector_norm):
                return (145, 'error', question)
            sim = doc.similarity(doc1)
            if sim > match_thr:
                if resp:
                    if resp["sim"] < sim:
                        resp["sim"] = sim
                        resp["resp"] = intent["ans"]
                else:
                    resp["sim"] = sim
                    resp["resp"] = intent["ans"]
    if resp:
        return (resp["resp"])
    else:
        return(785, msg)

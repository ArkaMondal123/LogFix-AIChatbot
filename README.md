# LogFix-AIChatbot
its a chatbot and it has ai.


Built this for my school's annual "talent showcase" day (URJA).
It can answer queries commonly asked using spacy, a standard AI NLP to compare questions to FAQs and gives an optimal answer.
The bot also stores all unanswered questions in a database along with an email address and teachers (or someone else) can answer those using a website.
All unanswered questions are sent to a support email address with an assigned code, and teachers can answer those questions in a seperate SOLVER website where they can enter the code and answer the given question.

I've divided it into 3 sections.

The LOGIC:
--> Uses spacy to compare messages to already answered FAQS

The WEBSITE:
--> Its a website. Makes API calls to my python code.

The SOLVER:
--> For teachers. Lets you solve questions that appear in their email. They enter a autogenerated code and the website fetches the question with that code assigned to it for the teacher to resolve.

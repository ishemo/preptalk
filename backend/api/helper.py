from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from openai import OpenAI

class AIHelper:

    def __init__(self, resume, jobDescription, conversation):
        load_dotenv()
        self.model = ChatOpenAI(model="gpt-3.5-turbo")
        self.resume = resume
        self.jobDescription = jobDescription
        self.chatHistory = self.parseConversationIntoChatHistory(conversation)

    def parseConversationIntoChatHistory(self, messages):
        chatHistory = []
        for message in messages:
            content = message['text']
            if message['sender'] == 'user': 
                chatHistory.append(HumanMessage(content))
            else:
                chatHistory.append(AIMessage(content))

        introSystemMessage = SystemMessage(content=f"""You are an interviewer giving a behavioural interview for a job that has this job description:
                               {self.jobDescription}. The candidate that you are giving the interview to has this resume: {self.resume}. Introduce yourself as the interviewer and
                               introduce the position that the candidate is applying. Then ask the candidate to tell you a bit about themself to kick the interview off. 
                               Wait until they respond to ask anything else.""")
        
        bodyIntroSystemMessage = SystemMessage(content=f"""Now conduct the interview.
                                Ask the candidate one question or follow up question at a time for them to respond before continuing
                                the conversation. Do not make the questions too specific or too hard. After asking a question or two about a topic 
                                go ahead and ask the candidate about a different topic.""")
        
        closingSystemMessage = SystemMessage(content = """It is time to end the interview now. Wrap up the interview and thank the candidate for their time.""")

        chatHistory.insert(0, introSystemMessage)

        if(len(chatHistory) > 3):
            chatHistory.append(bodyIntroSystemMessage)
        
        if(len(chatHistory) > 14):
            chatHistory.append(closingSystemMessage)

        return chatHistory
    
    def getResponse(self):
        return self.model.invoke(self.chatHistory).content


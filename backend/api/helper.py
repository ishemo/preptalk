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
        return chatHistory
    
    def getResponse(self):
        return self.model.invoke(self.chatHistory).content

    def getIntroResponse(self):
        introSystemMessage = SystemMessage(content=f"""You are an interviewer giving a behavioural interview for a job that has this job description:
                               {self.jobDescription}. The candidate that you are giving the interview to has this resume: {self.resume}. Start introducing yourself and the
                               position they are applying for then ask the candidate to tell you a bit about themself. Wait until their response to say anything else.""")

        self.chatHistory.insert(0, introSystemMessage)

        return self.model.invoke(self.chatHistory).content

    def getBodyResponse(self):
        

        return self.model.invoke(self.chatHistory).content

    def getClosingResponse(self):
        


        return self.model.invoke(self.chatHistory).content
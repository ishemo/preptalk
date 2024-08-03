from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, ResumeSerializer, JobDescriptionSerializer, MessageSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Resume, JobDescription
from .helper import AIHelper
import json

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class ResumeListCreate(generics.ListCreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Resume.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class ResumeDelete(generics.DestroyAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Resume.objects.filter(author=user)
    
class JobDescriptionListCreate(generics.ListCreateAPIView):
    serializer_class = JobDescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JobDescription.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class JobDescriptionDelete(generics.DestroyAPIView):
    serializer_class = JobDescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JobDescription.objects.filter(author=user)
    
class MessageView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if  serializer.is_valid():

            # get conversation from json 
            conversation = serializer.validated_data.get("conversation")

            # get resume and job description
            user = self.request.user
            resume = Resume.objects.get(author=user).content
            jobDescription = JobDescription.objects.get(author=user).content

            # get ai response
            ai = AIHelper(resume, jobDescription, conversation)
            response = ai.getResponse()

            return Response(data={"message": f"{response}"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
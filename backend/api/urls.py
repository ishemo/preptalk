from django.urls import path
from . import views

urlpatterns = [
    path("resumes/", views.ResumeListCreate.as_view(), name="resume-list"),
    path("resumes/delete/<int:pk>/", views.ResumeDelete.as_view(), name="delete-resume"),
    path("job-descriptions/", views.JobDescriptionListCreate.as_view(), name="job-description-list"),
    path("job-descriptions/delete/<int:pk>/", views.JobDescriptionDelete.as_view(), name="delete-job-description"),
    path("message/", views.MessageView.as_view(), name="message"),
]
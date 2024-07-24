import { useState, useEffect } from "react";
import api from "../api";
import Resume from "../components/Resume"
import JobDescription from "../components/JobDescription"
import "../styles/Home.css"
import { useNavigate } from 'react-router-dom';


function Home() {
    const [resumes, setResumes] = useState([]);
    const [resumeContent, setResumeContent] = useState("");
    const [resumeTitle, setResumeTitle] = useState("");
    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [jobDescriptionContent, setJobDescriptionContent] = useState("");
    const [jobDescriptionTitle, setJobDescriptionTitle] = useState("");

    useEffect(() => {
        getJobDescriptions();
        getResumes();
    }, []);

    const navigate = useNavigate();

    const handleChatNavigation = () => {
      navigate('/chat');
    };

    const getResumes = () => {
        api
            .get("/api/resumes/")
            .then((res) => res.data)
            .then((data) => {
                setResumes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteResume = (id) => {
        api
            .delete(`/api/resumes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Resume deleted!");
                else alert("Failed to delete resume.");
                getResumes();
            })
            .catch((error) => alert(error));
    };

    const createResume = (e) => {
        e.preventDefault();
        api
            .post("/api/resumes/", { content: resumeContent, title: resumeTitle })
            .then((res) => {
                if (res.status === 201) alert("Resume created!");
                else alert("Failed to make resume.");
                getResumes();
            })
            .catch((err) => alert(err));
    };

    const getJobDescriptions = () => {
        api
            .get("/api/job-descriptions/")
            .then((res) => res.data)
            .then((data) => {
                setJobDescriptions(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteJobDescription = (id) => {
        api
            .delete(`/api/job-descriptions/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Job description deleted!");
                else alert("Failed to delete job description.");
                getJobDescriptions();
            })
            .catch((error) => alert(error));
    };

    const createJobDescription = (e) => {
        e.preventDefault();
        api
            .post("/api/job-descriptions/", { content: jobDescriptionContent, title: jobDescriptionTitle })
            .then((res) => {
                if (res.status === 201) alert("Job description created!");
                else alert("Failed to make job description.");
                getJobDescriptions();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Resumes</h2>
                {resumes.map((resume) => (
                    <Resume resume={resume} onDelete={deleteResume} key={resume.id} />
                ))}
            </div>
            <div>
                <h2>Job Descriptions</h2>
                {jobDescriptions.map((jobDescription) => (
                    <JobDescription jobDescription={jobDescription} onDelete={deleteJobDescription} key={jobDescription.id} />
                ))}
            </div>
            <h2>Create a Resume</h2>
            <form onSubmit={createResume}>
                <label htmlFor="resumeTitle">Resume Title:</label>
                <br />
                <input
                    type="text"
                    id="resumeTitle"
                    name="resumeTitle"
                    required
                    onChange={(e) => setResumeTitle(e.target.value)}
                    value={resumeTitle}
                />
                <label htmlFor="resumeContent">Content:</label>
                <br />
                <textarea
                    type="text"
                    id="resumeContent"
                    name="resumeContent"
                    required
                    value={resumeContent}
                    onChange={(e) => setResumeContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
            <h2>Create a Job Description</h2>
            <form onSubmit={createJobDescription}>
                <label htmlFor="jobDescriptionTitle">Job Title:</label>
                <br />
                <input
                    type="text"
                    id="jobDescriptionTitle"
                    name="jobDescriptionTitle"
                    required
                    onChange={(e) => setJobDescriptionTitle(e.target.value)}
                    value={jobDescriptionTitle}
                />
                <label htmlFor="jobDescriptionContent">Content:</label>
                <br />
                <textarea
                    type="text"
                    id="jobDescriptionContent"
                    name="jobDescriptionContent"
                    required
                    value={jobDescriptionContent}
                    onChange={(e) => setJobDescriptionContent(e.target.value)}
                ></textarea>
                <input type="submit" value="Submit"></input>
            </form>
            <br/>
            <br />
                <center><button onClick={handleChatNavigation} className="chat-button">Go to Chat Page</button></center>
        </div>
    );
}

export default Home;
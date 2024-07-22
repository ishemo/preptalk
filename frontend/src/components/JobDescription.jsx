import React from "react";
import "../styles/JobDescription.css"

function JobDescription({ jobDescription, onDelete }) {
    const formattedDate = new Date(jobDescription.created_at).toLocaleDateString("en-US")

    return (
        <div className="jobDescription-container">
            <p className="jobDescription-title">{jobDescription.title}</p>
            <p className="jobDescription-content">{jobDescription.content}</p>
            <p className="jobDescription-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(jobDescription.id)}>
                Delete Job Description
            </button>
        </div>
    );
}

export default JobDescription
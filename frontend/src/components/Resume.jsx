import React from "react";
import "../styles/Resume.css"

function Resume({ resume, onDelete }) {
    const formattedDate = new Date(resume.created_at).toLocaleDateString("en-US")

    return (
        <div className="resume-container">
            <p className="resume-title">{resume.title}</p>
            <p className="resume-content">{resume.content}</p>
            <p className="resume-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(resume.id)}>
                Delete Resume
            </button>
        </div>
    );
}

export default Resume
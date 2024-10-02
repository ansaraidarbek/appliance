import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import JobElem from "../JobElem";
import SS from './PersonalInformation.module.css';
import handleLogging from "../../sharedJS/logging";
import { setJobPostingModal } from "../../redux/slices/jobPosting";

const PersonalPage = () => {
    const dispatch = useDispatch();
    const [userJobs, setUserJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(6);
    const userEmail = useSelector((state) => state.user.email);
    const jobPostingModal = useSelector((state) => state.jobPosting.isJobPostingModal);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
        if (!jobPostingModal) {
            if (!userEmail) {
                // Redirect to login page if user is not logged in
                handleLogging(userEmail, dispatch);
            } else {
                fetchUserJobs();
            }
        }
    }, [userEmail, jobPostingModal]);

    const fetchUserJobs = () => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const userJobIds = JSON.parse(localStorage.getItem('userJobs'))?.[userEmail] || [];
        const userJobs = jobs.filter(job => userJobIds.includes(job.job_id));
        setUserJobs(userJobs);
    };

    const handleCreateJob = () => {
        dispatch(setJobPostingModal(true));
    };

    const handleDeleteJob = (jobId) => {
        const updatedJobs = userJobs.filter(job => job.job_id !== jobId);

        // Update localStorage
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const updatedAllJobs = jobs.filter(job => job.job_id !== jobId);
        localStorage.setItem('jobs', JSON.stringify(updatedAllJobs));

        const userJobIds = JSON.parse(localStorage.getItem('userJobs')) || {};
        userJobIds[userEmail] = userJobIds[userEmail].filter(id => id !== jobId);
        localStorage.setItem('userJobs', JSON.stringify(userJobIds));

        setUserJobs(updatedJobs);
    };

    // Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = userJobs.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className={SS.main}>
            <h1>Personal Page</h1>
            <div className={SS.buttonContainer}>
                <button onClick={handleCreateJob}>Post new Job</button>
            </div>
            <ul className={SS.list}>
                {currentJobs.map(job => (
                    <JobElem key={job.job_id} job={job} addButtons={true} onDelete={handleDeleteJob} />
                ))}
            </ul>
            <div className={SS.pagination}>
                {Array.from({ length: Math.ceil(userJobs.length / jobsPerPage) }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default PersonalPage;
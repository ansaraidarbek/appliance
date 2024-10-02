import React, { useState, useEffect } from "react";
import styles from "./jobPostingModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setJobPostingModal } from '../../redux/slices/jobPosting';

const JobPostingModal = () => {
    const job = useSelector((state) => state.jobPosting.job);
    const [jobTitle, setJobTitle] = useState(job?.job_title || "");
    const [companyName, setCompanyName] = useState(job?.employer_name || "");
    const [city, setCity] = useState(job?.job_city || "");
    const [jobDescription, setJobDescription] = useState(job?.job_description || "");
    const [minSalary, setMinSalary] = useState(job?.job_min_salary || "");
    const [maxSalary, setMaxSalary] = useState(job?.job_max_salary || "");
    const [applyOptions, setApplyOptions] = useState(job?.apply_options?.map(option => option.apply_link) || [""]);
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.user.email);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                dispatch(setJobPostingModal(false));
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [dispatch]);

    const handleAddApplyOption = () => {
        if (applyOptions.length < 3) {
            setApplyOptions([...applyOptions, ""]);
        }
    };

    const handleApplyOptionChange = (index, value) => {
        const updatedOptions = applyOptions.map((option, i) =>
            i === index ? value : option
        );
        setApplyOptions(updatedOptions);
    };

    const onClose = () => {
        dispatch(setJobPostingModal(false));
    }

    const onSubmit = (concreteJob) => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const jobIndex = job ? jobs.findIndex(elem => elem.job_id === job.job_id) : -1;

        if (jobIndex !== -1) {
            const jobId = jobs[jobIndex].job_id;
            concreteJob.job_id = jobId;
            jobs[jobIndex] = concreteJob;
        } else {
            jobs.push(concreteJob);
        }

        localStorage.setItem('jobs', JSON.stringify(jobs));

        const userJobs = JSON.parse(localStorage.getItem('userJobs')) || {};
        if (!userJobs[userEmail]) {
            userJobs[userEmail] = [];
        }
        if (jobIndex === -1) {
            userJobs[userEmail].push(concreteJob.job_id);
        }
        localStorage.setItem('userJobs', JSON.stringify(userJobs));

        dispatch(setJobPostingModal(false));
    }

    const getWebsiteName = (url) => {
        try {
            const parsedUrl = new URL(url);
            let hostname = parsedUrl.hostname;

            if (hostname.startsWith('www.')) {
                hostname = hostname.substring(4);
            }

            if (hostname.endsWith('.com')) {
                hostname = hostname.substring(0, hostname.length - 4);
            }

            return hostname;
        } catch (error) {
            console.error("Invalid URL:", error);
            return "";
        }
    }

    const getNewJobId = () => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const maxJobId = jobs.reduce((maxId, job) => {
            const jobIdNumber = parseInt(job.job_id.split('_')[1], 10);
            return Math.max(maxId, jobIdNumber);
        }, 0);
        return `job_${maxJobId + 1}`;
    }

    const handlePostJob = () => {
        if (!jobTitle || !companyName || !city || !jobDescription) {
            return;
        }
        const newJobId = getNewJobId();
        const jobData = {
            job_id: newJobId,
            job_title: jobTitle,
            employer_name: companyName,
            job_city: city,
            job_description: jobDescription,
            job_min_salary: minSalary,
            job_max_salary: maxSalary,
            apply_options: applyOptions.map((apply_link) => ({ apply_link, publisher: getWebsiteName(apply_link) })),
        }
        onSubmit(jobData);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Post a Job</h2>
                <label>Job Title:</label>
                <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                />

                <label>Company Name:</label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />

                <label>City:</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />

                <label>Job Description:</label>
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                />

                <label>Minimum Salary:</label>
                <input
                    type="number"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                />

                <label>Maximum Salary:</label>
                <input
                    type="number"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                />

                <label>Job Apply Options (up to 3):</label>
                {applyOptions.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => handleApplyOptionChange(index, e.target.value)}
                    />
                ))}
                {applyOptions.length < 3 && (
                    <button onClick={handleAddApplyOption} className={styles.addApplyButton}>Add Apply Option</button>
                )}

                <div className={styles.modalActions}>
                    <button onClick={handlePostJob}>Post Job</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default JobPostingModal;
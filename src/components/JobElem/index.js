import React from 'react';
import SS from './JobElem.module.css';
import { editJobPostingModal } from "../../redux/slices/jobPosting";
import { useDispatch } from "react-redux";
import {nextPage} from "../../redux/slices/pageSlice";

const JobElem = ({ job, addButtons, onDelete = () => {} }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(editJobPostingModal({ isJobPostingModal: true, job }));
    };

    const handleApply = () => {
        dispatch(nextPage(`/apply/${job.job_id}`));
    };

    return (
        <li className={SS.jobCard}>
            <h2>{job.job_title}</h2>
            <p className={SS.companyName}>{job.employer_name}</p>
            <p className={SS.country}>{job.job_city}</p>
            <p className={SS.description}>{job.job_description}</p>
            <p className={SS.salaryRange}>{job.job_min_salary ? `${job.job_min_salary} - ${job.job_max_salary} ${job.job_salary_currency}` : 'Salary not specified'}</p>
            <div className={SS.applyOptions}>
                {job.apply_options?.slice(0, 6)?.map(provider => (
                    <a key={provider.apply_link} href={provider.apply_link} target="_blank" rel="noopener noreferrer">
                        Apply via {provider.publisher}
                    </a>
                ))}
            </div>
            {addButtons ?
                <div className={SS.buttonContainer}>
                    <button className={SS.editButton} onClick={() => handleEdit()}>Edit</button>
                    <button className={SS.deleteButton} onClick={() => onDelete(job.job_id)}>Delete</button>
                </div>
                : <button className={SS.applyBtn} onClick={handleApply}>Apply</button>}
        </li>
    );
};

export default JobElem;
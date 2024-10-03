import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SS from './JobListingPage.module.css';
import JobElem from "../JobElem";
import {initializeJobs} from "../../sharedJS/jobsInitialization";

const JobListingsPage = () => {
 const [jobs, setJobs] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [jobsPerPage] = useState(6);
 const [filter, setFilter] = useState({ title: '', location: '' });
 const [searchTriggered, setSearchTriggered] = useState(false);
 const [fetchCompleted, setFetchCompleted] = useState(false);

 useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top when component mounts
 }, []);

 const enhanceJobs = (fetchedJobs) => {
  const localJobs = initializeJobs();
  console.log(localJobs);
  const filteredLocalJobs = localJobs.filter(job =>
      job.job_title.toLowerCase().includes(filter.title.toLowerCase()) &&
      job.job_city.toLowerCase().includes(filter.location.toLowerCase())
  );
  console.log(filteredLocalJobs);
  return [...fetchedJobs, ...filteredLocalJobs];
 };

 const fetchJobs = async () => {
  if (!filter.location) {
   alert('Location is required');
   return;
  }

  const title = filter.title ? filter.title : 'Web Developer';
  const options = {
   method: 'GET',
   url: 'https://jsearch.p.rapidapi.com/search',
   params: {
    query: title + ' in ' + filter.location,
    date_posted: 'all'
   },
   headers: {
    'x-rapidapi-key': '8e7e6648f4msh0ff6b80aec53260p185ae3jsn75be6477e5e6',
    'x-rapidapi-host': 'jsearch.p.rapidapi.com'
   }
  };

  try {
   const response = await axios.request(options);
   const enhancedJobs = enhanceJobs(response.data.data);
   setJobs(enhancedJobs);
   setFetchCompleted(true);
  } catch (error) {
   console.error('Error fetching jobs', error);
   setFetchCompleted(true);
  }
 };

 useEffect(() => {
  if (searchTriggered) {
   fetchJobs();
   setSearchTriggered(false);
  }
 }, [searchTriggered]);

 const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilter({ ...filter, [name]: value });
 };

 const handleSearch = () => {
  setFetchCompleted(false);
  setSearchTriggered(true);
 };

 const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
   handleSearch();
  }
 };

 const indexOfLastJob = currentPage * jobsPerPage;
 const indexOfFirstJob = indexOfLastJob - jobsPerPage;
 const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 return (
     <section className={SS.main}>
      <h1>Appliance Job Listings</h1>
      <p>Find your next career opportunity with appliance</p>
      <div className={SS.filter}>
       <input
           type="text"
           name="title"
           placeholder="Filter by job title"
           value={filter.title}
           onChange={handleFilterChange}
           onKeyPress={handleKeyPress}
       />
       <input
           type="text"
           name="location"
           placeholder="Filter by location"
           value={filter.location}
           onChange={handleFilterChange}
           onKeyPress={handleKeyPress}
           required
       />
       <button onClick={handleSearch}>Search</button>
      </div>
      {fetchCompleted && currentJobs.length === 0 ? (
          <div className={SS.noJobs}>
           <h1>No Jobs Found</h1>
           <p>Try again with a different prompt</p>
          </div>
      ) : (
          <>
           <ul className={SS.list}>
            {currentJobs.map(job => (
                <JobElem key={job.job_id} job={job} addButtons={false} />
            ))}
           </ul>
           <div className={SS.pagination}>
            {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                <button key={i} onClick={() => paginate(i + 1)}>
                 {i + 1}
                </button>
            ))}
           </div>
          </>
      )}
     </section>
 );
};

export default JobListingsPage;
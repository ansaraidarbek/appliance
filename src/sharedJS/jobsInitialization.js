const jobs = [
    {
        job_id: "job_1",
        job_title: "Senior Node.js Developer",
        employer_name: "Intetics",
        job_city: "New York",
        job_state: "NY",
        job_country: "US",
        job_description: "Looking for a Senior Node.js Developer with experience in gaming development.",
        job_min_salary: 100000,
        job_max_salary: 150000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "LinkedIn",
                apply_link: "https://www.linkedin.com/jobs/view/senior-node-js-developer-at-intetics-4033613786",
                is_direct: false
            }
        ]
    },
    {
        job_id: "job_2",
        job_title: "Frontend Developer",
        employer_name: "Tech Solutions",
        job_city: "San Francisco",
        job_state: "CA",
        job_country: "US",
        job_description: "Seeking a Frontend Developer with expertise in React.js.",
        job_min_salary: 90000,
        job_max_salary: 120000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "Indeed",
                apply_link: "https://www.indeed.com/jobs/view/frontend-developer-at-tech-solutions-4033613787",
                is_direct: true
            }
        ]
    },
    {
        job_id: "job_3",
        job_title: "Backend Developer",
        employer_name: "Innovatech",
        job_city: "Austin",
        job_state: "TX",
        job_country: "US",
        job_description: "Looking for a Backend Developer with experience in Node.js and MongoDB.",
        job_min_salary: 95000,
        job_max_salary: 130000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "Glassdoor",
                apply_link: "https://www.glassdoor.com/job/backend-developer-innovatech-4033613788",
                is_direct: false
            }
        ]
    },
    {
        job_id: "job_4",
        job_title: "Full Stack Developer",
        employer_name: "WebWorks",
        job_city: "Seattle",
        job_state: "WA",
        job_country: "US",
        job_description: "Full Stack Developer needed with experience in both frontend and backend technologies.",
        job_min_salary: 110000,
        job_max_salary: 140000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "Monster",
                apply_link: "https://www.monster.com/job/full-stack-developer-webworks-4033613789",
                is_direct: true
            }
        ]
    },
    {
        job_id: "job_5",
        job_title: "DevOps Engineer",
        employer_name: "CloudNet",
        job_city: "Boston",
        job_state: "MA",
        job_country: "US",
        job_description: "DevOps Engineer with experience in AWS and Docker.",
        job_min_salary: 105000,
        job_max_salary: 135000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "LinkedIn",
                apply_link: "https://www.linkedin.com/jobs/view/devops-engineer-at-cloudnet-4033613790",
                is_direct: false
            }
        ]
    },
    {
        job_id: "job_6",
        job_title: "Data Scientist",
        employer_name: "DataCorp",
        job_city: "Chicago",
        job_state: "IL",
        job_country: "US",
        job_description: "Data Scientist with experience in Python and machine learning.",
        job_min_salary: 115000,
        job_max_salary: 145000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "Indeed",
                apply_link: "https://www.indeed.com/jobs/view/data-scientist-at-datacorp-4033613791",
                is_direct: true
            }
        ]
    },
    {
        job_id: "job_7",
        job_title: "Mobile Developer",
        employer_name: "Appify",
        job_city: "Los Angeles",
        job_state: "CA",
        job_country: "US",
        job_description: "Mobile Developer with experience in iOS and Android development.",
        job_min_salary: 95000,
        job_max_salary: 125000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "Glassdoor",
                apply_link: "https://www.glassdoor.com/job/mobile-developer-appify-4033613792",
                is_direct: false
            }
        ]
    },
    {
        job_id: "job_8",
        job_title: "UI/UX Designer",
        employer_name: "DesignHub",
        job_city: "Miami",
        job_state: "FL",
        job_country: "US",
        job_description: "UI/UX Designer with experience in Figma and Adobe XD.",
        job_min_salary: 85000,
        job_max_salary: 115000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "Monster",
                apply_link: "https://www.monster.com/job/ui-ux-designer-designhub-4033613793",
                is_direct: true
            }
        ]
    },
    {
        job_id: "job_9",
        job_title: "Product Manager",
        employer_name: "ProdManage",
        job_city: "Denver",
        job_state: "CO",
        job_country: "US",
        job_description: "Product Manager with experience in Agile methodologies.",
        job_min_salary: 120000,
        job_max_salary: 150000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "LinkedIn",
                apply_link: "https://www.linkedin.com/jobs/view/product-manager-at-prodmanage-4033613794",
                is_direct: false
            }
        ]
    },
    {
        job_id: "job_10",
        job_title: "QA Engineer",
        employer_name: "QualityFirst",
        job_city: "Houston",
        job_state: "TX",
        job_country: "US",
        job_description: "QA Engineer with experience in automated testing.",
        job_min_salary: 90000,
        job_max_salary: 120000,
        job_salary_currency: "USD",
        apply_options: [
            {
                publisher: "Indeed",
                apply_link: "https://www.indeed.com/jobs/view/qa-engineer-at-qualityfirst-4033613795",
                is_direct: true
            }
        ]
    }
];

const users = [
    {
        email: "ans",
        password: "ans",
    },
    {
        email: "test2",
        password: "test",
    },
    {
        email: "test3",
        password: "test",
    }
]

const userJobs = {
    "ans": ["job_1", "job_3", "job_5"],
    "test2": ["job_2", "job_4", "job_6"],
    "test3": ["job_7", "job_9", "job_10"]
}



export const initializeDatabase = () => {
    const myJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const myUsers = JSON.parse(localStorage.getItem('users')) || [];
    const myConnections = JSON.parse(localStorage.getItem('userJobs')) || [];
    if (myJobs.length === 0) {
        localStorage.setItem('jobs', JSON.stringify(jobs));
    }
    if (myUsers.length === 0) {
        localStorage.setItem('users', JSON.stringify(users));
    }
    if (myConnections.length === 0) {
        localStorage.setItem('userJobs', JSON.stringify(userJobs));
    }
}

export const initializeJobs = () => {
    // Store the jobs array in local storage
    initializeDatabase();
    const jobsArray = JSON.parse(localStorage.getItem('jobs')) || [];
    return JSON.parse(localStorage.getItem('jobs')) || [];
}
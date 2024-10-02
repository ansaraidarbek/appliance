import React, {useState, useEffect, useCallback} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import JobListingsPage from './components/JobListingsPage';
import { Menu } from 'lucide-react';
import './App.css';
import PersonalPage from './components/PersonalPage';
import Home from './components/Home';
import JobApplicationPage from "./components/JobApplicationPage";
import LoginModal from "./components/loginModal";
import {useDispatch, useSelector} from "react-redux";
import NavigationHandler from "./components/NavigationHandler";
import {nextPage} from "./redux/slices/pageSlice";
import JobPostingModal from "./components/jobPostingModal";

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isPressed = useSelector((state) => state.modal.isPressed);
  const isJobPostingModal = useSelector((state) => state.jobPosting.isJobPostingModal);
  const page = useSelector((state) => state.page.currentPage);
  const navBarRef = React.createRef();
  const logoRef = React.createRef();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);

  const handleWindowSizeChange = () => {
    if (window.innerWidth < window.innerHeight) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  const getNavs = function () {
    const handleLinks = (link) => {
        if (isMobile) {
          setMobileMenuOpen(false);
        }
        dispatch(nextPage(link));
    }
    return (
        <>
          <a onClick={() => handleLinks('/')}> Home</a>
          <a onClick={() => handleLinks('/job-listings')}>Jobs</a>
          <a onClick={() => handleLinks('/personal-page')}>Personal Page{userEmail ? `/${userEmail}` : null}</a>
        </>
    )
  }

  const handleNavDesign = useCallback(() => {
    if (isMobile || !navBarRef.current || !logoRef.current) {
      return;
    }

    if (page.includes('personal-page') || page.includes('apply')) {
      navBarRef.current.classList.add('blackNav');
      logoRef.current.classList.add('blackLogo');
    } else {
      navBarRef.current.classList.remove('blackNav');
      logoRef.current.classList.remove('blackLogo');
    }
  }, [isMobile, navBarRef, logoRef, page]);

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  useEffect(() => {
    handleNavDesign();
  }, [isMobile, navBarRef, logoRef, page]);

  return (
      <Router>
        <NavigationHandler />
        <div className="main min-h-screen bg-gray-50">
          <nav className="navbar" ref={navBarRef}>
            <div className="container">
              <div className="navbar-content">
                {isMobile ?
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn sm:hidden">
                      <Menu className="icon" />
                    </button> :
                    <div className={'navBar'}>
                      {getNavs()}
                    </div>
                }
              </div>
            </div>
          </nav>
          <div className='logo-container' ref={logoRef}>
            Appliance
          </div>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/job-listings" element={<JobListingsPage />} />
              <Route path="/apply/:id" element={<JobApplicationPage />} />
              <Route path="/personal-page" element={<PersonalPage />} />
            </Routes>
          </main>

          {isPressed ? <LoginModal /> : null}
          {isJobPostingModal ? <JobPostingModal /> : null}
          {isMobile && (
              <div className={`links ${mobileMenuOpen ? 'show-menu' : ''}`}>
                <span className="close-btn" onClick={() => setMobileMenuOpen(false)}>×</span>
                {getNavs()}
              </div>
          )}
        </div>
      </Router>
  );
};

export default App;
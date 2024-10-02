import CustomSlider from "./slider";
import Testimonials from "./testimonials";
import Welcome from "./welcome";
import {useEffect} from "react";
import {initializeDatabase} from "../../sharedJS/jobsInitialization";

const Home = () => {

    useEffect(() => {
        initializeDatabase();
        window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
    return <>
        <Welcome></Welcome>
        <CustomSlider ></CustomSlider>
        <Testimonials></Testimonials>
    </>;
};
  
export default Home;
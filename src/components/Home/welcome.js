import SS from './welcome.module.css';
import {useDispatch} from "react-redux";
import {nextPage} from "../../redux/slices/pageSlice";

const Welcome = () => {
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        dispatch(nextPage("/job-listings"));
    };

    return (
        <section className={SS.main}>
            <h3>Your platform for job postings and applications</h3>
            <h1>Welcome to Appliance</h1>
            <button onClick={handleButtonClick}>Search now</button>
        </section>
    );
};

export default Welcome;
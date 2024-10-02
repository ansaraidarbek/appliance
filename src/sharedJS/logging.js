import { setIsPressed } from '../redux/slices/modalSlice';

const handleLogging = (email, dispatch) => {
    if (!email) {
        dispatch(setIsPressed(true));
    }
}

export default handleLogging;
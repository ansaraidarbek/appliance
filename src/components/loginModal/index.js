import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { setIsPressed } from '../../redux/slices/modalSlice';
import { setUser } from "../../redux/slices/userSlice";
import { backPage } from "../../redux/slices/pageSlice";
import styles from "./login.module.css";
import {setJobPostingModal} from "../../redux/slices/jobPosting";

const stopPropagation = (e) => {
    e.stopPropagation();
}

const LoginModal = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [signUpFailed, setSignUpFailed] = useState(false);
    const dispatch = useDispatch();
    const emailRef = useRef(null);

    const handleClossing = () => {
        dispatch(backPage());
        dispatch(setIsPressed(false));
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                handleClossing();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [dispatch]);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, [isLogin]);

    const isUserExist = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.email === email && user.password === password);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const userExists = await isUserExist(email, password);
        if (userExists) {
            dispatch(setUser({ email }));
            dispatch(setIsPressed(false));
        } else {
            setEmail('');
            setPassword('');
            setLoginFailed(true);
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        const userExists = isUserExist(email, password);
        if (userExists) {
            setSignUpFailed(true);
        } else {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ email, password });
            dispatch(setUser({ email }));
            dispatch(setIsPressed(false));
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.formPopup} onClick={stopPropagation}>
                <span className={`${styles.closeBtn} material-symbols-rounded`} onClick={() => handleClossing()}>close</span>
                {isLogin ?
                    <div className={`${styles.formBox} ${styles.login}`}>
                        <div className={styles.formDetails}>
                            <h2>Welcome Back</h2>
                            <p>Please log in using your personal information to stay connected with us.</p>
                        </div>
                        <div className={styles.formContent}>
                            <h2>LOGIN</h2>
                            <form onSubmit={handleLogin}>
                                <div className={`${styles.inputField} ${loginFailed ? styles.error : ''}`}>
                                    <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                                    <label>Email</label>
                                </div>
                                <div className={`${styles.inputField} ${loginFailed ? styles.error : ''}`}>
                                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label>Password</label>
                                </div>
                                <a href="#" className={styles.forgotPassLink}>Forgot password?</a>
                                <button type="submit">Log In</button>
                            </form>
                            <div className={styles.bottomLink}>
                                Don't have an account?
                                <a id="signup-link" onClick={() => setIsLogin(false)}>Signup</a>
                            </div>
                        </div>
                    </div> :
                    <div className={`${styles.formBox} ${styles.signup}`}>
                        <div className={styles.formDetails}>
                            <h2>Create Account</h2>
                            <p>To become a part of our community, please sign up using your personal information.</p>
                        </div>
                        <div className={styles.formContent}>
                            <h2>SIGNUP</h2>
                            <form onSubmit={handleSignUp}>
                                <div className={`${styles.inputField} ${signUpFailed ? styles.error : ''}`}>
                                    <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                                    <label>Enter your email</label>
                                </div>
                                <div className={`${styles.inputField} ${signUpFailed ? styles.error : ''}`}>
                                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label>Create password</label>
                                </div>
                                <div className={styles.policyText}>
                                    <input type="checkbox" id="policy" />
                                    <label htmlFor="policy">
                                        I agree the
                                        <a href="#" className={styles.option}>Terms & Conditions</a>
                                    </label>
                                </div>
                                <button type="submit">Sign Up</button>
                            </form>
                            <div className={styles.bottomLink}>
                                Already have an account?
                                <a id="login-link" onClick={() => setIsLogin(true)}>Login</a>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default LoginModal;
import styles from './JobApplicationPage.module.css';

const JobApplicationPage = () => {
  return <section className={styles.main}>
    <div className={styles.apply_box}>
      <h1>
        Job Application
      </h1>
      <form
          action="https://formsubmit.co/e5cc5f7becc8fe1ead61e9e9f5afc74a"
          className={styles.form}
          method="POST"
      >
        <div className={styles.form_container}>
          <div className={styles.form_control}>
            <label htmlFor="first_name">First name</label>
            <input
                id="first_name"
                name="first_name"
                placeholder="Enter your first name"
                autoComplete="off"
                required
            />
            <input type="hidden" name="_next" value="/freedom4/login2.html" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="last_name">Last name</label>
            <input
                id="last_name"
                name="last_name"
                placeholder="Enter your Last name"
                autoComplete="off"
                required
            />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="email">Your Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email.."
                autoComplete="off"
                required
            />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="phone">Your Phone No.</label>
            <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Enter your Mobile No."
                autoComplete="off"
                required
            />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="job_rol">Your Job Rol</label>
            <input
                type="input"
                id="job_rol"
                value="FrontEndDeveloper"
                readOnly
            />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="link">Your Portfolio link</label>
            <input
                type="link"
                id="link"
                name="link"
                placeholder="Enter your Portfolio link.."
                required
            />
          </div>
          <div className={styles.textarea_control}>
            <label htmlFor="address">Your Cover Letter</label>
            <textarea
                type="text"
                id="address"
                name="address"
                placeholder="Enter your Cover Letter.."
                autoComplete="off"
                rows="4"
                cols="50"
            ></textarea>
          </div>
          <div className={styles.form_control}>
            <label htmlFor="city">Your City</label>
            <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your City (Town).."
                autoComplete="off"
                required
            />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="files">Upload your C.V.</label>
            <input
                id="files"
                type="file"
                name="file"
                multiple="multiple"
                accept="image/jpeg, image/png, image/jpg, image/svg"
            />
            <output id="result" className={styles.result} />
          </div>
        </div>
        <div className={styles.button_container}>
          <button type="submit">Apply Now</button>
        </div>
      </form>
    </div>
  </section>;
};

export default JobApplicationPage;
import React from "react";
import image1 from '../images/testingImage.jpg'; // Replace with your actual image path
import image2 from '../images/testingImage.jpg';
import image3 from '../images/testingImage.jpg';
import SS from './testimonials.module.css'

const testimonials = [
  {
    image: image1,
    title: "Great Platform",
    description: "I found my dream job through joby. Highly recommend it!",
  },
  {
    image: image2,
    title: "Easy to Use",
    description: "Applying for jobs has never been easier. Thanks, joby!",
  },
  {
    image: image3,
    title: "Efficient Service",
    description: "The job postings are genuine and the process is very efficient.",
  },
];

const Testimonials = () => {
  return (
    <section className={SS.main}>
      <h2>User Testimonials</h2>
      <p>
        See what our users have to say about their experience with joby
      </p>
      
      {testimonials.map((testimonial, index) => (
        <div
          className={SS.testimonial}
          key={index}
          style={{
            display: "flex",
            flexDirection: index % 2 === 0 ? "row" : "row-reverse", // Alternates image position
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div className={SS.imgContainer} style={{ display: "flex", flex:  1, justifyContent: index % 2 === 0 ? "flex-start" : "flex-end" }}>
            <img
              src={testimonial.image}
              alt={testimonial.title}
            />
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <h3>
              {testimonial.title}
            </h3>
            <p>{testimonial.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Testimonials;
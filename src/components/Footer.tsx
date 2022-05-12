import React from "react";
import '../styles/Footer.css'


const Footer = () => {
  return (
    <div className="footer">
      <p>Double-click to edit a todo</p>
      <p>
        Created by{" "}
        <a href="https://www.linkedin.com/in/abhishekpawan">
          Abhishek Kumar
        </a>
      </p>
      <p>
        Part of <a href="https://todomvc.com/">TodoMVC</a>{" "}
      </p>
    </div>
  );
};

export default Footer;

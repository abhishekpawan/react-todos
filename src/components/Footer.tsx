import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>Double-click to edit a todo</p>
      <p>
        Created by{" "}
        <a className="contact" href="https://www.linkedin.com/in/abhishekpawan">
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

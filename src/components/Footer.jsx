import React from "react";
import Logo from "../img/recipes_logo.jpg";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Made with ♥️ and <b>React.js</b>.
      </span>
    </footer>
  );
};

export default Footer;

/* import React from 'react';
import Logo from "../img/recipes_logo.jpg";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt='' />
      <span>Made with ♥️ and <b>React.js</b>.</span>
    </footer>
  );
};

export default Footer; */
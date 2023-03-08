import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="footerClass">
          <p>Written by Nate Brown</p>
          <a href="https://github.com/nate-brown-1">GitHub Profile</a>
        </footer>
      </>
      );
  }
}

export default Footer;
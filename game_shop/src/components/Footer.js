import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-title">
          <h3>Top Games</h3>
          <p>Join our community of gamers! We offer only licensed keys, instant access, and 24/7 dedicated support.</p>
        </div>
        <div className="social-links">
            <a href="#"><span className="fa fa-facebook">f</span></a>
            <a href="#"><span className="fa fa-twitter">t</span></a>
            <a href="#"><span className="fa fa-linkedin">in</span></a>
            <a href="#"><span className="fa fa-google-plus">G+</span></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
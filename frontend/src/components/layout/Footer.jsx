import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white py-8 md:py-12 mx-4 sm:mx-6 lg:mx-8"
      style={{ backgroundColor: "#A42831" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs sm:text-sm leading-relaxed">
          <span className="block sm:inline">© Copyright 2025 | Mixer | All Rights Reserved</span>
          <span className="hidden sm:inline"> | </span>
          <a href="/privacy-policy" className="block sm:inline text-white hover:text-teal-400 my-1 sm:my-0">
            Privacy Policy
          </a>
          <span className="hidden sm:inline"> | </span>
          <a
            href="/terms-conditions"
            className="block sm:inline text-white hover:text-teal-400 my-1 sm:my-0"
          >
            Terms & Conditions
          </a>
          <span className="hidden sm:inline"> | </span>
          <a href="/contact" className="block sm:inline text-white hover:text-teal-400 my-1 sm:my-0">
            Contact Support
          </a>
          <span className="hidden sm:inline"> | </span>
          <span className="block sm:inline mt-2 sm:mt-0">Powered by Mountain Air Marketing</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

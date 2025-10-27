import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white pt-8 md:pt-12 pb-4 md:pb-3 mx-4 sm:mx-6 lg:mx-8"
      style={{ backgroundColor: "#A42831" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs sm:text-sm leading-relaxed mb-6">
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

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-3">
          <a 
            href="https://www.facebook.com/people/Mixer-Dating-Colorado-Springs/61578765920982/?mibextid=wwXIfr&rdid=WBF8TUSfFr8R9D6I&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1A2XjtV26m%2F%3Fmibextid%3DwwXIfr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 rounded-md flex items-center justify-center text-white transition-all hover:opacity-80 hover:scale-105"
            style={{ backgroundColor: "#D4A548" }}
            aria-label="Follow us on Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a 
            href="https://www.instagram.com/mixerdatingco/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 rounded-md flex items-center justify-center text-white transition-all hover:opacity-80 hover:scale-105"
            style={{ backgroundColor: "#D4A548" }}
            aria-label="Follow us on Instagram"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

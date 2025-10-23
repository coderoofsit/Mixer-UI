import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white py-12 mx-4 sm:mx-6 lg:mx-8"
      style={{ backgroundColor: "#A42831" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          © Copyright 2025 | Mixer | All Rights Reserved |{" "}
          <a href="/privacy-policy" className="text-white hover:text-teal-400">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms-conditions"
            className="text-white hover:text-teal-400"
          >
            Terms & Conditions
          </a>{" "}
          |{" "}
          <a href="/support" className="text-white hover:text-teal-400">
            Contact Support
          </a>{" "}
          | Powered by Mountain Air Marketing
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useState } from "react";
import LandingHeader from "../components/layout/LandingHeader";

const Contact = () => {
  const [formLoaded, setFormLoaded] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    let script = null;
    let timeoutId = null;

    const loadSmartMatchForm = () => {
      try {
        // Check if script already exists
        const existingScript = document.querySelector(
          'script[src*="submission_form.min.js"]'
        );
        if (existingScript) {
          initializeForm();
          return;
        }

        // Create and load the script
        script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "https://dsg1jgkr1b4yd.cloudfront.net/static/js/submission_form.min.js";
        script.async = true;

        script.onload = () => {
          console.log("SmartMatch script loaded successfully");
          initializeForm();
        };

        script.onerror = (error) => {
          console.error("Failed to load SmartMatch script:", error);
          setFormError("Failed to load contact form. Please refresh the page.");
        };

        document.head.appendChild(script);

        // Set a timeout to handle cases where the script doesn't load
        timeoutId = setTimeout(() => {
          if (!formLoaded) {
            console.warn("SmartMatch script loading timeout");
            setFormError(
              "Contact form is taking longer than expected to load. Please refresh the page."
            );
          }
        }, 10000); // 10 second timeout
      } catch (error) {
        console.error("Error loading SmartMatch form:", error);
        setFormError("An error occurred while loading the contact form.");
      }
    };

    const initializeForm = () => {
      try {
        if (window.SubmissionForm) {
          const options = {
            id: 18,
            domain: "https://mixer.smartmatchapp.com",
            placeholder_id: "sform-placeholder",
            styles_id: "sform-style",
          };

          const form = new window.SubmissionForm(options);
          form.render();
          setFormLoaded(true);
          console.log("SmartMatch form initialized successfully");
        } else {
          console.warn("SubmissionForm not available on window object");
          setFormError(
            "Contact form is not available. Please try again later."
          );
        }
      } catch (error) {
        console.error("Error initializing SmartMatch form:", error);
        setFormError(
          "Failed to initialize contact form. Please refresh the page."
        );
      }
    };

    // Start loading the form
    loadSmartMatchForm();

    return () => {
      // Cleanup
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [formLoaded]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <LandingHeader />

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-8">
            Contact Mixer
          </h4>
          <p className="text-lg text-gray-600 mb-12">
            Whether you're ready to find your match, curious about how it all
            works, or just want to say hi—we'd love to hear from you!
          </p>

          <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
            {/* Loading State */}
            {!formLoaded && !formError && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading contact form...</p>
              </div>
            )}

            {/* Error State with Fallback Form */}
            {formError && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Using Fallback Contact Form
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>{formError}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fallback Contact Form */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Contact Us
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* SmartMatch Form Integration */}
            <style id="sform-style"></style>
            <div
              id="sform-placeholder"
              style={{ opacity: formLoaded ? 1 : 0 }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

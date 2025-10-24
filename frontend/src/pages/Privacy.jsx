// src/pages/Privacy.jsx
import React from "react";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";

const Privacy = () => {
  const SectionTitle = ({ children }) => (
    // Minimal vertical space below the title
    <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-0"> 
      {children}
    </h2>
  );

  const Subtitle = ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
      {children}
    </h3>
  );

  const ListItem = ({ children }) => (
    <li className="list-disc ml-6 text-gray-700 mb-1">
      {children}
    </li>
  );

  // Helper component for the date.
  const DateDisplay = ({ date }) => (
    // Minimal vertical space below the date
    <p className="text-sm text-gray-500 mb-1 mt-0">
      Effective Date: {date}
    </p>
  );

  // Dedicated Rule component with mb-6 (1.5rem) for large space below the line
  const Rule = () => (
    <div className="border-b-2 mb-6" style={{ borderColor: '#5D1751' }}></div> 
  );

  const effectiveDate = "08/04/25";

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        {/* Privacy Policy Section */}
        <SectionTitle>Privacy Policy</SectionTitle>
        <DateDisplay date={effectiveDate} />
        <Rule />
        <p className="text-gray-700 mb-4">
          Welcome to Mixer. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This privacy policy outlines how we collect, use, and protect your personal information.
        </p>

        <Subtitle>Information We Collect</Subtitle>
        <p className="text-gray-700 mb-2">We may collect the following types of information:</p>
        <ul className="list-none space-y-2">
          <ListItem>Personal Identification Information: Name, email address, phone number, mailing address, etc.</ListItem>
          <ListItem>Non-Personal Identification Information: Browser type, operating system, device information, IP address, etc.</ListItem>
          <ListItem>Usage Data: Pages visited, time spent on the site, links clicked, etc.</ListItem>
        </ul>

        <Subtitle>How We Use Your Information</Subtitle>
        <p className="text-gray-700 mb-2">We use the information we collect for the following purposes:</p>
        <ul className="list-none space-y-2">
          <ListItem>To Provide and Improve Our Services: To process transactions, manage accounts, and provide customer support.</ListItem>
          <ListItem>To Personalize User Experience: To tailor content and advertisements to your interests.</ListItem>
          <ListItem>To Communicate with You: To send updates, newsletters, and promotional materials.</ListItem>
          <ListItem>To Analyze and Improve Our Website: To understand how users interact with our site and improve functionality.</ListItem>
          <ListItem>To Comply with Legal Obligations: To enforce our terms of service and comply with legal requirements.</ListItem>
        </ul>

        <Subtitle>Sharing Your Information</Subtitle>
        <p className="text-gray-700 mb-2">We may share your information with:</p>
        <ul className="list-none space-y-2">
          <ListItem>Service Providers: Third-party vendors who assist us in operating our website and providing our services.</ListItem>
          <ListItem>Business Partners: Partners we collaborate with for promotions and joint ventures.</ListItem>
          <ListItem>Legal Authorities: When required by law or to protect our rights and safety.</ListItem>
        </ul>

        <Subtitle>Your Rights</Subtitle>
        <p className="text-gray-700 mb-2">You have the following rights regarding your personal information:</p>
        <ul className="list-none space-y-2">
          <ListItem>Access: You can request a copy of the personal information we hold about you.</ListItem>
          <ListItem>Correction: You can request that we correct any inaccurate or incomplete information.</ListItem>
          <ListItem>Deletion: You can request that we delete your personal information.</ListItem>
          <ListItem>Opt-Out: You can opt-out of receiving marketing communications from us.</ListItem>
        </ul>

        <Subtitle>Security</Subtitle>
        <p className="text-gray-700 mb-4">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <Subtitle>Changes to This Privacy Policy</Subtitle>
        <p className="text-gray-700 mb-4">
          We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.
        </p>

        <Subtitle>Contact Us</Subtitle>
        <div className="text-gray-700 space-y-1">
          <p>If you have any questions or concerns about this privacy policy, please contact us at:</p>
          <p className="font-semibold">Mixer</p>
          <p>Colorado Springs</p>
          <p>970-778-9371</p>
        </div>
        
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
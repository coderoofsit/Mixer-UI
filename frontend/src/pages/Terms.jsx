import React from "react";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";

const Terms = () => {
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

  const effectiveDate = "9/23/2025";

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        {/* Terms & Conditions Section */}
        <SectionTitle>Terms & Conditions</SectionTitle>
        <DateDisplay date={effectiveDate} />
        <Rule />
        <p className="text-gray-700 mb-4">
          Welcome to Mixer, Ltd. (“Mixer,” “we,” “us,” “our”). These Terms and Conditions (“Terms”) govern your use of the Mixer mobile application, website, and any related events, services, or features (collectively, the “Services”). By creating an account or using the Services, you agree to these Terms.
        </p>

        <Subtitle>Eligibility</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>You must be at least 21 years old to use Mixer or attend events.</ListItem>
          <ListItem>You must complete a background check before attending in-person events or using the APP.</ListItem>
          <ListItem>By using Mixer, you represent that all information you provide is true and accurate.</ListItem>
        </ul>

        <Subtitle>Account Responsibilities</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>You are responsible for maintaining the confidentiality of your login credentials.</ListItem>
          <ListItem>You agree not to share your account or impersonate another person.</ListItem>
          <ListItem>We may suspend or terminate accounts that violate these Terms.</ListItem>
        </ul>

        <Subtitle>Subscriptions & Payments</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer charges subscription fees and/or event fees. Prices are displayed before purchase.</ListItem>
          <ListItem>All payments are final and non-refundable except where required by law.</ListItem>
          <ListItem>If you purchase through the App Store or Google Play, their payment terms apply.</ListItem>
        </ul>

        <Subtitle>User Conduct</Subtitle>
        <p className="text-gray-700 mb-2">You agree not to:</p>
        <ul className="list-none space-y-2">
          <ListItem>Harass, threaten, or harm others.</ListItem>
          <ListItem>Post false, misleading, or offensive content.</ListItem>
          <ListItem>Use the Services for commercial solicitation or illegal activities.</ListItem>
        </ul>

        <Subtitle>Background Checks & Safety</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer requires background verification but cannot guarantee safety.</ListItem>
          <ListItem>Users are responsible for their interactions and should exercise caution.</ListItem>
        </ul>

        <Subtitle>Intellectual Property</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer owns all content, logos, and trademarks related to the Services.</ListItem>
          <ListItem>You may not copy, distribute, or modify Mixer content without permission.</ListItem>
        </ul>

        <Subtitle>Event Participation</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Attendance is at your own risk.</ListItem>
          <ListItem>Mixer is not responsible for personal injury, illness, theft, or property damage at events.</ListItem>
        </ul>

        <Subtitle>Limitation of Liability</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer provides the Services “as is.”</ListItem>
          <ListItem>We disclaim liability for damages resulting from user interactions, matches, or events.</ListItem>
        </ul>

        <Subtitle>Termination</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>We may suspend or terminate your access for any violation of these Terms.</ListItem>
        </ul>

        <Subtitle>Governing Law</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>These Terms are governed by the laws of the State of Colorado, without regard to conflict of law principles.</ListItem>
        </ul>
        
        <div className="border-t border-gray-300 my-10"></div>

        {/* Privacy Policy Section */}
        <SectionTitle>Privacy Policy</SectionTitle>
        <DateDisplay date={effectiveDate} />
        <Rule />
        <p className="text-gray-700 mb-4">
          This Privacy Policy explains how Mixer, Ltd. (“Mixer,” “we,” “us,” “our”) collects, uses, and protects your personal information. By using our Services, you consent to this Policy.
        </p>

        <Subtitle>Information We Collect</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Account Information: Name, email, phone, date of birth, gender, preferences.</ListItem>
          <ListItem>Verification Data: background check data, location data</ListItem>
          <ListItem>Payment Information: Processed securely through third-party providers.</ListItem>
          <ListItem>Usage Data: Device info, app activity, location (if enabled).</ListItem>
        </ul>

        <Subtitle>How We Use Your Information</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>To create and manage accounts.</ListItem>
          <ListItem>To verify identity and perform background checks.</ListItem>
          <ListItem>To recommend matches and curate events.</ListItem>
          <ListItem>To process payments and subscriptions.</ListItem>
          <ListItem>To comply with legal requirements.</ListItem>
        </ul>

        <Subtitle>Sharing of Information</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>We may share information with: Vendors/partners (payment processors, background check providers).</ListItem>
          <ListItem>Law enforcement if required by law.</ListItem>
          <ListItem>We do not sell personal information to third parties.</ListItem>
        </ul>

        <Subtitle>Data Security</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>We use encryption and secure servers.</ListItem>
          <ListItem>No system is 100% secure; users share data at their own risk.</ListItem>
        </ul>

        <Subtitle>Data Retention</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>We retain data as long as your account is active.</ListItem>
          <ListItem>You may request deletion at any time, subject to legal obligations.</ListItem>
        </ul>

        <Subtitle>Children’s Privacy</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer is not for individuals under 21 years old.</ListItem>
        </ul>

        <Subtitle>Your Rights</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Depending on your location, you may have the right to access, correct, or delete your personal information.</ListItem>
        </ul>

        <Subtitle>Updates</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>We may update this Policy and will notify you of significant changes.</ListItem>
        </ul>

        <div className="border-t border-gray-300 my-10"></div>

        {/* Disclaimers Section */}
        <SectionTitle>Disclaimers</SectionTitle>

        <Subtitle>Safety Disclaimer</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer provides background checks and safety measures but cannot eliminate all risks. Users are responsible for their personal safety and choices when engaging with others.</ListItem>
        </ul>

        <Subtitle>No Guarantee of Matches</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer does not guarantee successful matches, relationships, or outcomes.</ListItem>
        </ul>

        <Subtitle>Event Disclaimer</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Attendance at events is voluntary and at your own risk. Mixer is not liable for injuries, losses, or damages.</ListItem>
        </ul>

        <Subtitle>Third-Party Services</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer uses third-party providers for payments, background checks, and hosting. We are not responsible for errors, delays, or damages caused by these providers.</ListItem>
        </ul>

        <Subtitle>“As Is” Services</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer provides its Services without warranties of any kind, express or implied.</ListItem>
        </ul>

        <div className="border-t border-gray-300 my-10"></div>

        {/* Subscription Policy Section */}
        <SectionTitle>Subscription Policy</SectionTitle>
        <DateDisplay date={effectiveDate} />
        <Rule />

        <Subtitle>Billing Cycle</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Subscriptions are billed monthly on the same calendar day as the original purchase date.</ListItem>
          <ListItem>If the purchase date falls on the 28th, 29th, 30th, or 31st, future subscription payments will be charged on the 1st day of each month.</ListItem>
        </ul>

        <Subtitle>Automatic Renewal</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Your subscription will automatically renew each month unless canceled at least 24 hours before the next billing date.</ListItem>
        </ul>

        <Subtitle>Payment Processing</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>All payments are processed securely through third-party app store providers (e.g., Apple App Store, Google Play).</ListItem>
          <ListItem>Mixer does not store your complete payment details.</ListItem>
        </ul>

        <Subtitle>Cancellations</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>You may cancel your subscription anytime through your device’s app store settings.</ListItem>
          <ListItem>No refunds will be issued for partial months or unused portions of subscriptions.</ListItem>
        </ul>

        <Subtitle>Changes to Fees</Subtitle>
        <ul className="list-none space-y-2">
          <ListItem>Mixer reserves the right to update subscription fees with prior notice</ListItem>
        </ul>

      </div>

      <Footer />
    </div>
  );
};

export default Terms;
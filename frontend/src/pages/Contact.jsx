import React, { useState, useEffect } from "react";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";
import Input from "../components/ui/Input";
import CustomDropdown from "../components/ui/CustomDropdown";
import Button from "../components/ui/Button";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useProfile } from "../contexts/ProfileContext";
import authService from "../services/authService";

// Options for dropdowns, similar to ProfileSetupScreen
const monthOptions = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
const genderOptions = ["Male", "Female", "Non-binary", "Other", "Prefer not to say"];

// Country codes with flags
const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
];

// Format country codes for dropdown display
const countryCodeOptions = countryCodes.map(c => `${c.flag} ${c.code}`);

const Contact = () => {
  const { profileData, fetchProfile } = useProfile();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "🇺🇸 +1",
    location: "Colorado Springs",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [prefilledFields, setPrefilledFields] = useState({});

  // Helper function to parse date of birth
  const parseDateOfBirth = (dob) => {
    if (!dob) return { day: "", month: "", year: "" };
    
    // Handle various date formats
    const date = new Date(dob);
    if (isNaN(date.getTime())) return { day: "", month: "", year: "" };
    
    const day = date.getDate().toString().padStart(2, '0');
    const monthIndex = date.getMonth();
    const month = monthOptions[monthIndex];
    const year = date.getFullYear().toString();
    
    return { day, month, year };
  };

  // Auto-populate form when user is logged in
  useEffect(() => {
    const loadUserData = async () => {
      // Check if user is authenticated
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        // Fetch profile if not already loaded
        if (!profileData) {
          await fetchProfile();
        }
      }
    };
    
    loadUserData();
  }, []);

  // Populate form data when profile data is available
  useEffect(() => {
    if (profileData) {
      console.log('📋 Populating contact form with profile data:', profileData);
      
      // Parse name
      const fullName = profileData.name || "";
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      // Parse date of birth
      const { day, month, year } = parseDateOfBirth(profileData.dateOfBirth);
      
      // Get email from Firebase user or profile
      const user = authService.getCurrentUser();
      const email = profileData.email || user?.email || "";
      
      // Track which fields were actually prefilled from profile
      setPrefilledFields({
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        phone: !!profileData.phone,
        location: false, // Always allow location to be editable
        dobDay: !!day,
        dobMonth: !!month,
        dobYear: !!year,
        gender: !!profileData.gender,
      });
      
      setFormData({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: profileData.phone || "",
        countryCode: "🇺🇸 +1", // Default, could be parsed from phone if available
        location: "Colorado Springs", // Static location for now
        dobDay: day,
        dobMonth: month,
        dobYear: year,
        gender: profileData.gender || "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error if user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous messages
    setSubmitMessage({ type: '', text: '' });
    
    // Basic validation
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
      newErrors.dob = "Full date of birth is required";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      console.log("Form submitted:", formData);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Show success message
        setSubmitMessage({ 
          type: 'success', 
          text: 'Thank you for contacting us! We will get back to you soon.' 
        });
        
        // Scroll to top to show the message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset form if user is not authenticated
        if (!isAuthenticated) {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            countryCode: "🇺🇸 +1",
            location: "Colorado Springs",
            dobDay: "",
            dobMonth: "",
            dobYear: "",
            gender: "",
          });
        }
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Mixer
          </h1>

          {/* Success/Error Message */}
          {submitMessage.text && (
            <div 
              className={`mb-6 p-4 rounded-lg border ${
                submitMessage.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <p className="text-sm font-medium">{submitMessage.text}</p>
            </div>
          )}
          
          {/* Social Icons from screenshot */}
          <div className="flex justify-center space-x-3 mb-8">
            <a 
              href="https://www.facebook.com/people/Mixer-Dating-Colorado-Springs/61578765920982/?mibextid=wwXIfr&rdid=WBF8TUSfFr8R9D6I&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1A2XjtV26m%2F%3Fmibextid%3DwwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-md flex items-center justify-center text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#A42831" }}
              aria-label="Follow us on Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a 
              href="https://www.instagram.com/mixerdatingco/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-md flex items-center justify-center text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#A42831" }}
              aria-label="Follow us on Instagram"
            >
              <FaInstagram size={20} />
            </a>
          </div>

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Whether you're ready to find your match, curious about how it all
            works, or just want to say hi—we'd love to hear from you!
          </p>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto text-left relative" style={{ overflow: "visible" }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              General Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name *"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  required
                  disabled={isAuthenticated && prefilledFields.firstName}
                />
                <Input
                  label="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
                  disabled={isAuthenticated && prefilledFields.lastName}
                />
              </div>

              {/* Email */}
              <Input
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                disabled={isAuthenticated && prefilledFields.email}
              />

              {/* Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <CustomDropdown
                    label="Country Code *"
                    value={formData.countryCode}
                    options={countryCodeOptions}
                    placeholder="🇺🇸 +1"
                    onChange={(value) => handleDropdownChange("countryCode", value)}
                    maxHeight="200px"
                    enableScroll={true}
                    disabled={isAuthenticated && prefilledFields.phone}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(201) 555-0123"
                    required
                    disabled={isAuthenticated && prefilledFields.phone}
                    className="w-full h-[56px] px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <Input
                label="Location *"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                placeholder="Colorado Springs"
                required
                disabled={isAuthenticated && prefilledFields.location}
              />

              {/* Birthdate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birthdate <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3 items-start">
                  <Input
                    name="dobDay"
                    value={formData.dobDay}
                    onChange={handleChange}
                    placeholder="DD"
                    required
                    disabled={isAuthenticated && prefilledFields.dobDay}
                  />
                  <CustomDropdown
                    value={formData.dobMonth}
                    options={monthOptions}
                    placeholder="Month"
                    onChange={(value) => handleDropdownChange("dobMonth", value)}
                    maxHeight="180px"
                    enableScroll={true}
                    disabled={isAuthenticated && prefilledFields.dobMonth}
                  />
                  <Input
                    name="dobYear"
                    value={formData.dobYear}
                    onChange={handleChange}
                    placeholder="YYYY"
                    required
                    disabled={isAuthenticated && prefilledFields.dobYear}
                  />
                </div>
                {errors.dob && (
                  <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
                )}
              </div>

              {/* Gender */}
              <div className="relative z-10">
                <CustomDropdown
                  label="Gender *"
                  value={formData.gender}
                  options={genderOptions}
                  placeholder="Select Gender"
                  onChange={(value) => handleDropdownChange("gender", value)}
                  error={errors.gender}
                  enableScroll={false}
                  disabled={isAuthenticated && prefilledFields.gender}
                />
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
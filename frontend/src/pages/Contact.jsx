import React, { useState, useEffect } from "react";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";
import Input from "../components/ui/Input";
import CustomDropdown from "../components/ui/CustomDropdown";
import DatePicker from "../components/ui/DatePicker";
import Button from "../components/ui/Button";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import apiClient from "../services/apiService";

// Options for dropdowns
const genderOptions = ["Male", "Female", "Other Gender"];

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
    location: "",
    dateOfBirth: "", // Store as MM-DD-YYYY string
    gender: "",
    message: "", // Optional message field
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(true);

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

  const handleDateChange = (dateString) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: dateString,
    }));
    if (errors.dateOfBirth) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setSuccessMessage("");
    
    // Basic validation
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation (10-15 digits)
    if (formData.phone) {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        newErrors.phone = "Phone number must be at least 10 digits";
      } else if (digitsOnly.length > 15) {
        newErrors.phone = "Phone number must not exceed 15 digits";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // Format the date of birth from MM-DD-YYYY to YYYY-MM-DD
        const [month, day, year] = formData.dateOfBirth.split('-');
        const formattedDOB = `${year}-${month}-${day}`;
        
        // Extract country code from the selected option (e.g., "🇺🇸 +1" -> "+1")
        const countryCode = formData.countryCode.split(' ')[1] || "+1";
        
        // Prepare data for API
        const contactData = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          countryCode: countryCode,
          location: formData.location.trim(),
          dateOfBirth: formattedDOB,
          gender: formData.gender,
          message: formData.message.trim() // Optional message
        };

        console.log("📤 Sending contact form data:", contactData);

        // Make API call
        const response = await apiClient.post("/api/v1/contactus", contactData);

        console.log("✅ Contact form submitted successfully:", response.data);

        // Hide form and show success message
        setShowForm(false);
        setSuccessMessage("Thank you for contacting us! We'll get back to you soon.");

        // Reset form data immediately (hidden from user)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          countryCode: "🇺🇸 +1",
          location: "",
          dateOfBirth: "",
          gender: "",
          message: "",
        });

        // After 5 seconds, hide success message and show form again
        setTimeout(() => {
          setSuccessMessage("");
          setShowForm(true);
        }, 5000);

      } catch (error) {
        console.error("❌ Failed to submit contact form:", error);
        
        // Handle error response
        const errorMessage = error.response?.data?.message || "Failed to submit form. Please try again.";
        setErrors({ submit: errorMessage });
      } finally {
        setIsLoading(false);
      }
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
            
            {/* Success Message - Replaces Form */}
            {!showForm && successMessage ? (
              <div className="text-center py-16 animate-fade-in">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {/* Success Message */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Message Sent Successfully!
                </h2>
                <p className="text-lg text-gray-700 mb-2">
                  {successMessage}
                </p>
                <p className="text-sm text-gray-500">
                  We typically respond within 24-48 hours.
                </p>
                
                {/* Progress indicator */}
                <div className="mt-8 flex justify-center">
                  <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full animate-progress"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  General Information
                </h2>

                {/* Error Message */}
                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">{errors.submit}</p>
                  </div>
                )}

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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  {/* Country Code Dropdown */}
                  <div className="w-36">
                    <CustomDropdown
                      value={formData.countryCode}
                      options={countryCodeOptions}
                      placeholder="🇺🇸 +1"
                      onChange={(value) => handleDropdownChange("countryCode", value)}
                      maxHeight="200px"
                      enableScroll={true}
                    />
                  </div>
                  {/* Phone Number Input */}
                  <div className="flex-1">
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(201) 555-0123"
                      maxLength={20}
                      required
                      className="w-full h-[56px] px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 bg-white"
                    />
                  </div>
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
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
                  Date of Birth <span className="text-red-600">*</span>
                </label>
                <DatePicker
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  placeholder="MM-DD-YYYY"
                  minAge={null}
                  className="w-full"
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
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

              {/* Message (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 bg-white resize-none"
                  placeholder="Tell us more about your inquiry or how we can help you..."
                  maxLength={1000}
                />
                <div className="flex justify-end mt-1">
                  <p className="text-xs text-gray-500">
                    {formData.message.length}/1000 characters
                  </p>
                </div>
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
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
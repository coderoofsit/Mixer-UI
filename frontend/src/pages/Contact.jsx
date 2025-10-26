import React, { useState } from "react";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";
import Input from "../components/ui/Input";
import CustomDropdown from "../components/ui/CustomDropdown";
import Button from "../components/ui/Button";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "🇺🇸 +1",
    location: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
        // Reset form or show success message
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
                />
                <Input
                  label="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
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
                placeholder="City/Town*"
                required
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
                  />
                  <CustomDropdown
                    value={formData.dobMonth}
                    options={monthOptions}
                    placeholder="Month"
                    onChange={(value) => handleDropdownChange("dobMonth", value)}
                    maxHeight="180px"
                    enableScroll={true}
                  />
                  <Input
                    name="dobYear"
                    value={formData.dobYear}
                    onChange={handleChange}
                    placeholder="YYYY"
                    required
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
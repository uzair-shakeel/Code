import React, { useState, useEffect } from "react";
import ContactForm from "../components/PartnerReferral/ContactForm";
import FeaturesSection from "../components/PartnerReferral/FeaturesSection";

const PartnerReferral = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.company.trim()) newErrors.company = "Company is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Simulate API submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message
        setShowSuccess(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            company: "",
            message: "",
          });
          setShowSuccess(false);
          setIsSubmitting(false);
        }, 3000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-charcoal py-8 sm:py-12 px-4 md:px-8 pt-[95px] md:pt-[110px]">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-4">
            Let's Work Together
          </h1>
          <p className="text-xl text-[#B3B3B3] max-w-3xl mx-auto font-open-sans">
            Agents, builders, and consultants — refer your clients confidently.
            We're committed to making you look good.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="feature-card bg-[#1A1A1A] rounded-lg p-8 text-center transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl">
            <div className="text-5xl mb-6 feature-icon">💼</div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-3">
              Co-branded Funnels
            </h3>
            <p className="text-[#B3B3B3]">
              Custom landing pages with your branding to create a seamless
              experience for your clients.
            </p>
          </div>

          <div className="feature-card bg-[#1A1A1A] rounded-lg p-8 text-center transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl delay-75">
            <div className="text-5xl mb-6 feature-icon">📊</div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-3">
              Live Status Updates
            </h3>
            <p className="text-[#B3B3B3]">
              Always know where your clients stand in the mortgage process with
              real-time updates.
            </p>
          </div>

          <div className="feature-card bg-[#1A1A1A] rounded-lg p-8 text-center transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl delay-150">
            <div className="text-5xl mb-6 feature-icon">🕒</div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-3">
              Fast Preapprovals
            </h3>
            <p className="text-[#B3B3B3]">
              Quick turnaround times help your clients compete in today's
              competitive market.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FDC500] via-[#007EA7] to-[#00296B]"></div>

          <h2 className="text-2xl font-montserrat font-bold text-white mb-6 text-center">
            Partner With Us
          </h2>

          {showSuccess ? (
            <div className="bg-[#1A4B91] bg-opacity-20 border border-[#007EA7] rounded-lg p-6 text-center my-8 success-message">
              <div className="w-16 h-16 mx-auto mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572"
                    stroke="#007EA7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 4L12 14.01L9 11.01"
                    stroke="#007EA7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-montserrat font-bold text-white mb-2">
                Thanks for reaching out!
              </h3>
              <p className="text-[#B3B3B3]">
                We've received your message and will contact you shortly to
                discuss partnership opportunities.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[#B3B3B3] mb-2 font-open-sans"
                >
                  Your Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#007EA7] transition-colors ${
                    errors.name
                      ? "border border-red-500"
                      : "border border-transparent"
                  }`}
                  placeholder="John Smith"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[#B3B3B3] mb-2 font-open-sans"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#007EA7] transition-colors ${
                    errors.email
                      ? "border border-red-500"
                      : "border border-transparent"
                  }`}
                  placeholder="john@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-[#B3B3B3] mb-2 font-open-sans"
                >
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full bg-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#007EA7] transition-colors ${
                    errors.company
                      ? "border border-red-500"
                      : "border border-transparent"
                  }`}
                  placeholder="ABC Realty"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[#B3B3B3] mb-2 font-open-sans"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#007EA7] transition-colors border border-transparent"
                  placeholder="Tell us about your partnership interests..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FDC500] text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#FDC500]/30 transform transition-all duration-300 hover:translate-y-[-3px] flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Partner With Us"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 text-center">
          <div className="bg-[#1A1A1A] rounded-lg p-6 md:p-8 inline-block max-w-2xl mx-auto testimonial-card">
            <div className="text-3xl mb-4">"</div>
            <p className="text-lg text-[#B3B3B3] mb-6 font-open-sans italic">
              Working with Robert has made my business more profitable. My
              clients rave about the smooth preapproval process, and it makes
              them more confident during their home search.
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-[#007EA7] rounded-full flex items-center justify-center text-white font-bold mr-3">
                JS
              </div>
              <div className="text-left">
                <p className="text-white font-bold">Jennifer Smith</p>
                <p className="text-sm text-[#B3B3B3]">
                  Top Producer, Century 21
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .success-message {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .feature-icon {
          animation: pulse 3s infinite ease-in-out;
        }

        .feature-card:hover .feature-icon {
          animation-duration: 1.5s;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .testimonial-card {
          position: relative;
          box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.3);
        }

        .testimonial-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            rgba(0, 126, 167, 0.05) 0%,
            rgba(0, 41, 107, 0.05) 100%
          );
          z-index: 0;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default PartnerReferral;

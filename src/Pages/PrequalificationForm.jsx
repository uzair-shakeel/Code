import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, ref, push } from "../firebase/firebase";
import ProgressBar from "../components/PrequalificationForm/ProgressBar";
import FirstInfoStep from "../components/PrequalificationForm/FirstInfoStep";
import ButtonGroup from "../components/PrequalificationForm/ButtonGroup";
import SecondDetailsStep from "../components/PrequalificationForm/SecondDetailsStep";
import ThirdFinancialInfoStep from "../components/PrequalificationForm/ThirdFinancialInfoStep";

const PrequalificationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    zipCode: "",
    firstTimeBuyer: null,
    creditScore: "",
    incomeRange: "",
    loanType: "",
    timeline: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
    } else if (currentStep === 2) {
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = "ZIP code is required";
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
        newErrors.zipCode = "Please enter a valid ZIP code";
      }
      if (formData.firstTimeBuyer === null)
        newErrors.firstTimeBuyer = "Please select an option";
      if (!formData.creditScore)
        newErrors.creditScore = "Please select a credit score range";
    } else if (currentStep === 3) {
      if (!formData.incomeRange)
        newErrors.incomeRange = "Please select an income range";
      if (!formData.loanType) newErrors.loanType = "Please select a loan type";
      if (!formData.timeline) newErrors.timeline = "Please select a timeline";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      console.log("Starting form submission process...");

      try {
        // Create a submission object with a server timestamp
        const submissionData = {
          ...formData,
          submissionDate: new Date().toISOString(), // Use ISO string for consistent timestamp format
        };
        console.log("Submission data:", submissionData);

        // Save the form data to Firebase Realtime Database
        console.log("Attempting to write to Firebase at path: 'leads'");
        const leadsRef = ref(database, "leads");
        const result = await push(leadsRef, submissionData);
        console.log("Document successfully written with key:", result.key);

        // Show success message with animation
        setShowSuccess(true);

        // Redirect to thank you page after showing success message
        setTimeout(() => {
          navigate("/thank-you");
        }, 2000);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(
          "There was an error submitting your information. Please try again."
        );
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Welcome Intro */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-montserrat">
            Welcome to Your Prequalification
          </h1>
          <p className="text-lg text-[#B3B3B3] max-w-2xl mx-auto">
            We're here to help you get started on your home buying journey.
            Complete this quick form to see your mortgage options.
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {/* Success Message Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 success-overlay">
            <div className="bg-[#1A1A1A] rounded-lg p-8 max-w-md text-center transform success-modal">
              <div className="checkmark-wrapper mx-auto mb-6">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark-circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark-check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">
                Application Submitted!
              </h2>
              <p className="text-[#B3B3B3] mb-2">
                Your prequalification request has been received.
              </p>
              <p className="text-[#B3B3B3]">
                Redirecting you to the next steps...
              </p>
            </div>
          </div>
        )}

        {/* Form Steps */}
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg p-5 sm:p-8 transition-all duration-300">
          {currentStep === 1 && (
            <FirstInfoStep
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
          )}

          {currentStep === 2 && (
            <SecondDetailsStep
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleRadioChange={handleRadioChange}
            />
          )}

          {currentStep === 3 && (
            <ThirdFinancialInfoStep
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleRadioChange={handleRadioChange}
            />
          )}
        </div>

        {/* Button Group */}
        <ButtonGroup
          currentStep={currentStep}
          totalSteps={totalSteps}
          isSubmitting={isSubmitting}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </div>

      <style jsx>{`
        .success-overlay {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .success-modal {
          animation: scaleIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .checkmark-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #007ea7;
        }

        .checkmark {
          width: 100%;
          height: 100%;
        }

        .checkmark-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: white;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark-check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          stroke-width: 3;
          stroke: white;
          animation: stroke 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
        }

        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .checkmark-wrapper {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </div>
  );
};

export default PrequalificationForm;

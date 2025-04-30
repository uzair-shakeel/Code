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
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {/* Success Message Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 success-overlay">
            <div className="bg-[#1A1A1A] rounded-lg p-8 max-w-md text-center transform success-modal">
              <div className="success-checkmark mx-auto mb-6">
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
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
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg p-4 sm:p-6">
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
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-checkmark {
          width: 80px;
          height: 80px;
          position: relative;
        }

        .success-checkmark .check-icon {
          width: 80px;
          height: 80px;
          position: relative;
          border-radius: 50%;
          box-sizing: content-box;
          border: 4px solid #007ea7;
        }

        .success-checkmark .check-icon::before {
          top: 3px;
          left: -2px;
          width: 30px;
          transform-origin: 100% 50%;
          border-radius: 100px 0 0 100px;
        }

        .success-checkmark .check-icon::after {
          top: 0;
          left: 30px;
          width: 60px;
          transform-origin: 0 50%;
          border-radius: 0 100px 100px 0;
          animation: rotate-circle 4.25s ease-in;
        }

        .success-checkmark .check-icon::before,
        .success-checkmark .check-icon::after {
          content: "";
          height: 100px;
          position: absolute;
          background: #1a1a1a;
          transform: rotate(-45deg);
        }

        .success-checkmark .check-icon .icon-line {
          height: 5px;
          background-color: #007ea7;
          display: block;
          border-radius: 2px;
          position: absolute;
          z-index: 10;
        }

        .success-checkmark .check-icon .icon-line.line-tip {
          top: 46px;
          left: 14px;
          width: 25px;
          transform: rotate(45deg);
          animation: icon-line-tip 0.75s;
        }

        .success-checkmark .check-icon .icon-line.line-long {
          top: 38px;
          right: 8px;
          width: 47px;
          transform: rotate(-45deg);
          animation: icon-line-long 0.75s;
        }

        .success-checkmark .check-icon .icon-circle {
          top: -4px;
          left: -4px;
          z-index: 10;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          position: absolute;
          box-sizing: content-box;
          border: 4px solid #007ea7;
        }

        .success-checkmark .check-icon .icon-fix {
          top: 8px;
          width: 5px;
          left: 26px;
          z-index: 1;
          height: 85px;
          position: absolute;
          transform: rotate(-45deg);
          background-color: #1a1a1a;
        }

        @keyframes rotate-circle {
          0% {
            transform: rotate(-45deg);
          }
          5% {
            transform: rotate(-45deg);
          }
          12% {
            transform: rotate(-405deg);
          }
          100% {
            transform: rotate(-405deg);
          }
        }

        @keyframes icon-line-tip {
          0% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          54% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          70% {
            width: 50px;
            left: -8px;
            top: 37px;
          }
          84% {
            width: 17px;
            left: 21px;
            top: 48px;
          }
          100% {
            width: 25px;
            left: 14px;
            top: 45px;
          }
        }

        @keyframes icon-line-long {
          0% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          65% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          84% {
            width: 55px;
            right: 0px;
            top: 35px;
          }
          100% {
            width: 47px;
            right: 8px;
            top: 38px;
          }
        }
      `}</style>
    </div>
  );
};

export default PrequalificationForm;

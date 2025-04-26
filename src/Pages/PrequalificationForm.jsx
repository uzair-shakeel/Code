import React, { useState } from "react";
import ProgressBar from "../components/PrequalificationForm/ProgressBar";
import FirstInfoStep from "../components/PrequalificationForm/FirstInfoStep";
import ButtonGroup from "../components/PrequalificationForm/ButtonGroup";
import SecondDetailsStep from "../components/PrequalificationForm/SecondDetailsStep";
import ThirdFinancialInfoStep from "../components/PrequalificationForm/ThirdFinancialInfoStep";

const PrequalificationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        alert("Qualification request submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(
          "There was an error submitting your information. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

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
    </div>
  );
};

export default PrequalificationForm;

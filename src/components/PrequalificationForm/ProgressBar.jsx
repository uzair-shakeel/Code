import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Create an array of step numbers
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-montserrat text-[#B3B3B3]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-montserrat text-[#B3B3B3]">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      {/* Classic progress bar */}
      <div className="w-full bg-[#1A1A1A] rounded-full h-2.5 mb-6">
        <div
          className="bg-[#007EA7] h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Step indicators */}
      <div className="relative flex justify-between items-center">
        {/* Connecting line in background */}
        <div className="absolute left-0 right-0 h-0.5 bg-gray-700" />

        {/* Completed line */}
        <div
          className="absolute left-0 h-0.5 bg-[#007EA7] transition-all duration-300"
          style={{
            width: `${
              currentStep > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0
            }%`,
          }}
        />

        {/* Step circles */}
        {steps.map((step) => (
          <div key={step} className="relative z-10 flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                step < currentStep
                  ? "bg-[#007EA7] text-white"
                  : step === currentStep
                  ? "bg-[#1A1A1A] border-2 border-[#007EA7] text-white"
                  : "bg-[#1A1A1A] border border-gray-700 text-gray-500"
              }`}
            >
              {step < currentStep ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="text-xs font-medium">{step}</span>
              )}
            </div>
            <span
              className={`mt-2 text-xs transition-colors duration-300 ${
                step <= currentStep ? "text-white" : "text-gray-500"
              }`}
            >
              {step === 1 ? "Basics" : step === 2 ? "Details" : "Financial"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

import React from "react";

const ThirdFinancialInfoStep = ({ formData, errors, handleRadioChange }) => {
  return (
    <div className="space-y-6 sm:space-y-8 transition-all duration-300">
      <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-white mb-4 sm:mb-6">
        Financial Information
      </h2>

      <div className="space-y-5 sm:space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-montserrat text-[#B3B3B3] mb-2">
            Annual Household Income
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { value: "under50k", label: "Under $50,000" },
              { value: "50k-75k", label: "$50,000 - $75,000" },
              { value: "75k-100k", label: "$75,000 - $100,000" },
              { value: "100k-150k", label: "$100,000 - $150,000" },
              { value: "over150k", label: "Over $150,000" },
            ].map((option) => (
              <div
                key={option.value}
                className={`border p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.incomeRange === option.value
                    ? "bg-[#007EA7] bg-opacity-10 border-[#007EA7]"
                    : "border-gray-700 hover:border-gray-500"
                }`}
                onClick={() => handleRadioChange("incomeRange", option.value)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                      formData.incomeRange === option.value
                        ? "bg-[#007EA7]"
                        : "border border-gray-600"
                    }`}
                  ></div>
                  <span className="text-white">{option.label}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.incomeRange && (
            <p className="mt-1 text-sm text-red-500">{errors.incomeRange}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-montserrat text-[#B3B3B3] mb-2">
            Preferred Loan Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { value: "conventional", label: "Conventional" },
              { value: "fha", label: "FHA" },
              { value: "va", label: "VA" },
              { value: "unsure", label: "Not Sure" },
            ].map((option) => (
              <div
                key={option.value}
                className={`border p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.loanType === option.value
                    ? "bg-[#007EA7] bg-opacity-10 border-[#007EA7]"
                    : "border-gray-700 hover:border-gray-500"
                }`}
                onClick={() => handleRadioChange("loanType", option.value)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                      formData.loanType === option.value
                        ? "bg-[#007EA7]"
                        : "border border-gray-600"
                    }`}
                  ></div>
                  <span className="text-white">{option.label}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.loanType && (
            <p className="mt-1 text-sm text-red-500">{errors.loanType}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-montserrat text-[#B3B3B3] mb-2">
            Purchasing Timeline
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { value: "0-3", label: "0-3 months" },
              { value: "3-6", label: "3-6 months" },
              { value: "6-12", label: "6-12 months" },
              { value: "12+", label: "12+ months" },
            ].map((option) => (
              <div
                key={option.value}
                className={`border p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.timeline === option.value
                    ? "bg-[#007EA7] bg-opacity-10 border-[#007EA7]"
                    : "border-gray-700 hover:border-gray-500"
                }`}
                onClick={() => handleRadioChange("timeline", option.value)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                      formData.timeline === option.value
                        ? "bg-[#007EA7]"
                        : "border border-gray-600"
                    }`}
                  ></div>
                  <span className="text-white">{option.label}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.timeline && (
            <p className="mt-1 text-sm text-red-500">{errors.timeline}</p>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-[#B3B3B3] italic">
        All fields are required to submit your application.
      </p>
    </div>
  );
};

export default ThirdFinancialInfoStep;

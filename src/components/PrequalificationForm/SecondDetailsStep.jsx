import React from "react";
import FormInput from "../Layout/FormInput";

const SecondDetailsStep = ({
  formData,
  errors,
  handleInputChange,
  handleRadioChange,
}) => {
  return (
    <div className="space-y-6 sm:space-y-8 transition-all duration-300">
      <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-white mb-4 sm:mb-6">
        Property Details
      </h2>

      <div className="space-y-5 sm:space-y-6">
        <FormInput
          label="ZIP Code"
          name="zipCode"
          type="text"
          value={formData.zipCode}
          onChange={handleInputChange}
          error={errors.zipCode}
          placeholder="Enter property ZIP code"
        />

        <div className="space-y-3">
          <label className="block text-sm font-montserrat text-[#B3B3B3] mb-2">
            First Time Home Buyer?
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="first-time-yes"
                type="radio"
                name="firstTimeBuyer"
                value="yes"
                checked={formData.firstTimeBuyer === "yes"}
                onChange={() => handleRadioChange("firstTimeBuyer", "yes")}
                className="mr-2 h-5 w-5 text-[#007EA7] focus:ring-[#007EA7] focus:ring-offset-gray-800"
              />
              <label htmlFor="first-time-yes" className="text-white">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="first-time-no"
                type="radio"
                name="firstTimeBuyer"
                value="no"
                checked={formData.firstTimeBuyer === "no"}
                onChange={() => handleRadioChange("firstTimeBuyer", "no")}
                className="mr-2 h-5 w-5 text-[#007EA7] focus:ring-[#007EA7] focus:ring-offset-gray-800"
              />
              <label htmlFor="first-time-no" className="text-white">
                No
              </label>
            </div>
            {errors.firstTimeBuyer && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstTimeBuyer}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-montserrat text-[#B3B3B3] mb-2">
            Credit Score Range
          </label>
          <select
            name="creditScore"
            value={formData.creditScore}
            onChange={handleInputChange}
            className={`w-full p-3 bg-[#1A1A1A] border ${
              errors.creditScore ? "border-red-500" : "border-gray-700"
            } rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#007EA7] focus:border-[#007EA7] focus:outline-none transition-all duration-300 hover:border-gray-500`}
          >
            <option value="">Select your credit score range</option>
            <option value="excellent">Excellent (720+)</option>
            <option value="good">Good (680-719)</option>
            <option value="fair">Fair (620-679)</option>
            <option value="poor">Poor (580-619)</option>
            <option value="bad">Bad (below 580)</option>
          </select>
          {errors.creditScore && (
            <p className="mt-1 text-sm text-red-500">{errors.creditScore}</p>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-[#B3B3B3] italic">
        All fields are required to proceed to the next step.
      </p>
    </div>
  );
};

export default SecondDetailsStep;

import React from "react";
import FormInput from "../Layout/FormInput";

const FirstInfoStep = ({ formData, errors, handleInputChange }) => {
  return (
    <div className="space-y-6 sm:space-y-8 transition-all duration-300">
      <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-white mb-4 sm:mb-6">
        Basic Information
      </h2>
      <div className="space-y-5 sm:space-y-6">
        <FormInput
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          placeholder="Enter your full name"
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Enter your email"
        />

        <FormInput
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          placeholder="Enter your phone number"
        />
      </div>
      <p className="mt-4 text-sm text-[#B3B3B3] italic">
        All fields are required to proceed to the next step.
      </p>
    </div>
  );
};

export default FirstInfoStep;

import React from "react";

const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-sm font-montserrat text-[#B3B3B3] mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-3 bg-[#1A1A1A] border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-lg text-white placeholder-[#808080] focus:ring-2 focus:ring-[#007EA7] focus:border-[#007EA7] focus:outline-none transition-all duration-300 hover:border-gray-500`}
        placeholder={placeholder}
        style={{
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;

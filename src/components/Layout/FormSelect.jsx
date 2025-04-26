import React from 'react';

const FormSelect = ({ label, name, value, onChange, error, options }) => {
     return (
          <div>
               <label className="block text-sm font-montserrat text-[#B3B3B3] mb-2">{label}</label>
               <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full p-3 bg-[#1A1A1A] border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-[#B3B3B3] focus:ring-2 focus:ring-[#007EA7] focus:outline-none transition-colors duration-300`}
               >
                    {options.map((option) => (
                         <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
               </select>
               {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
     );
};

export default FormSelect;
import React from 'react';

const RadioGroup = ({ label, name, selectedValue, onChange, options, error, vertical = false }) => {
     return (
          <div>
               <label className="block text-sm font-montserrat text-[#B3B3B3] mb-2">{label}</label>
               <div className={`${vertical ? 'space-y-2' : 'flex space-x-4'}`}>
                    {options.map((option) => (
                         <label key={option.value} className="flex items-center">
                              <input
                                   type="radio"
                                   checked={selectedValue === option.value}
                                   onChange={() => onChange(name, option.value)}
                                   className="mr-2 w-4 h-4"
                              />
                              <span className="text-[#B3B3B3]">{option.label}</span>
                         </label>
                    ))}
               </div>
               {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
     );
};

export default RadioGroup;
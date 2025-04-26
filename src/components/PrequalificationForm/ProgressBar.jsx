import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
     const progressPercentage = (currentStep / totalSteps) * 100;

     return (
          <div className="mb-6 sm:mb-8">
               <div className="flex justify-between mb-2">
                    <span className="text-sm font-montserrat text-[#B3B3B3]">Step {currentStep} of {totalSteps}</span>
                    <span className="text-sm font-montserrat text-[#B3B3B3]">{Math.round(progressPercentage)}%</span>
               </div>
               <div className="w-full bg-[#1A1A1A] rounded-full h-2.5">
                    <div
                         className="bg-[#007EA7] h-2.5 rounded-full transition-all duration-300"
                         style={{ width: `${progressPercentage}%` }}
                    ></div>
               </div>
          </div>
     );
};

export default ProgressBar;
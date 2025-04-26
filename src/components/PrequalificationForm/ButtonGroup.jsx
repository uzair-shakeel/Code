import React from 'react';

const ButtonGroup = ({ currentStep, totalSteps, isSubmitting, handlePrevious, handleNext }) => {
     return (
          <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] shadow-lg p-4">
               <div className="max-w-3xl mx-auto flex justify-between">
                    {currentStep > 1 && (
                         <button
                              onClick={handlePrevious}
                              className="px-4 sm:px-6 py-3 border border-gray-700 text-[#B3B3B3] rounded-lg hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
                              disabled={isSubmitting}
                         >
                              Previous
                         </button>
                    )}
                    <button
                         onClick={handleNext}
                         disabled={isSubmitting}
                         className={`ml-auto px-4 sm:px-6 py-3 bg-[#007EA7] text-white rounded-lg hover:bg-opacity-90 group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#007EA7] focus:ring-opacity-50 ${currentStep === 1 ? 'w-full' : ''
                              } relative overflow-hidden`}
                    >
                         <span className="relative z-10 flex items-center justify-center">
                              {isSubmitting ? (
                                   <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                   </span>
                              ) : (
                                   <>
                                        {currentStep === totalSteps ? 'See If I Qualify' : 'Next'}
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                   </>
                              )}
                         </span>
                    </button>
               </div>
          </div>
     );
};

export default ButtonGroup;
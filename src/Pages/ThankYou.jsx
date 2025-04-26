import React from 'react';

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-charcoal py-8 sm:py-12 px-4 md:px-8 pt-[95px] md:pt-[110px]">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1A1A1A] rounded-lg shadow-custom p-6 sm:p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-[#007EA7] bg-opacity-10 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
            <svg className="w-8 sm:w-10 h-8 sm:h-10 text-[#007EA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-xl sm:text-3xl font-montserrat font-bold text-white mb-4">
            You're One Step Closer to Homeownership
          </h1>
          <p className="text-base sm:text-lg text-[#B3B3B3] mb-6 sm:mb-8 font-open-sans">
            We've received your info. We'll text you shortly with your results.
          </p>

          {/* Outlook Bookings Placeholder */}
          <div className="">
            <h2 className="text-base sm:text-xl font-montserrat font-bold text-white">
              Want to talk sooner? Book a quick preapproval chat.
            </h2>
            <div className="bg-[#1A1A1A] rounded-lg p-4 sm:p-8 text-center">
              <div className="h-48 sm:h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-[#B3B3B3]">Outlook Bookings Calendar</span>
              </div>
            </div>
          </div>

          {/* Upload Option */}
          <button className="px-4 sm:px-6 py-3 border border-white hover:border-[#007EA7] text-teal rounded-lg hover:bg-[#007EA7] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#007EA7] focus:ring-opacity-50">
            Upload Paystubs or W-2
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou; 
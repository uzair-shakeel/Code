import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Open URL in a new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-charcoal py-8 sm:py-12 px-4 md:px-8 pt-[95px] md:pt-[110px]">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1A1A1A] rounded-lg shadow-custom p-6 sm:p-8">
          {/* Success Message Animation */}
          <div className="success-animation mb-8">
            <div className="checkmark-wrapper">
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark-check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-10 success-content">
            <h1 className="text-xl sm:text-3xl font-montserrat font-bold text-white mb-4">
              You're One Step Closer to Homeownership
            </h1>
            <p className="text-base sm:text-lg text-[#B3B3B3] mb-6 sm:mb-8 font-open-sans">
              We've received your information and we'll text you shortly with
              your preapproval results.
            </p>
            <div className="p-4 bg-[#00296B] bg-opacity-20 rounded-lg border border-[#007EA7] my-6">
              <p className="text-white">
                <span className="font-bold">Pro Tip:</span> Watch for our text
                message to complete your preapproval. The faster you respond,
                the quicker we can get you approved.
              </p>
            </div>
          </div>

          {/* Outlook Bookings */}
          <div className="mb-8 booking-section">
            <h2 className="text-base sm:text-xl font-montserrat font-bold text-white mb-4 text-center">
              Want to talk sooner? Book a quick preapproval chat.
            </h2>
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 calendar-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="#007EA7"
                      strokeWidth="2"
                    />
                    <path d="M3 10H21" stroke="#007EA7" strokeWidth="2" />
                    <path
                      d="M16 2V6"
                      stroke="#007EA7"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 2V6"
                      stroke="#007EA7"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="7" cy="14" r="1" fill="#007EA7" />
                    <circle cx="12" cy="14" r="1" fill="#007EA7" />
                    <circle cx="17" cy="14" r="1" fill="#007EA7" />
                    <circle cx="7" cy="18" r="1" fill="#007EA7" />
                    <circle cx="12" cy="18" r="1" fill="#007EA7" />
                    <circle cx="17" cy="18" r="1" fill="#007EA7" />
                  </svg>
                </div>
                <p className="text-[#B3B3B3] text-center mb-5">
                  Schedule a quick call to discuss your preapproval options and
                  get personalized advice.
                </p>
                <button
                  onClick={() =>
                    openInNewTab(
                      "https://outlook.office365.com/owa/calendar/RobertBSummersHomeLoanPreapproval@branch777.onmicrosoft.com/bookings/"
                    )
                  }
                  className="w-full sm:w-auto font-medium px-6 py-3 bg-[#007EA7] text-white rounded-lg hover:bg-[#00607D] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#007EA7] focus:ring-opacity-50"
                >
                  Book a Quick Preapproval Chat
                </button>
              </div>
            </div>
          </div>

          {/* Upload Option */}
          <div className="text-center upload-section">
            <h2 className="text-base sm:text-xl font-montserrat font-bold text-white mb-4">
              Speed Up Your Approval
            </h2>
            <p className="text-[#B3B3B3] mb-5">
              Upload your financial documents now to get approved faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openInNewTab("https://www.swfdocs.com?FV=1618")}
                className="px-4 sm:px-6 py-3 border border-white hover:border-[#007EA7] text-white rounded-lg hover:bg-[#007EA7] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#007EA7] focus:ring-opacity-50"
              >
                Securely Upload Paystubs or W-2s
              </button>
              <Link
                to="/"
                className="px-4 sm:px-6 py-3 bg-transparent border border-gray-500 text-gray-400 rounded-lg hover:text-white hover:border-white transition-colors duration-300"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .success-animation {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 120px;
        }

        .checkmark-wrapper {
          width: 100px;
          height: 100px;
          position: relative;
        }

        .checkmark {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: block;
          stroke-width: 2;
          stroke: #007ea7;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #007ea7;
          animation: fill 0.4s ease-in-out 0.4s forwards,
            scale 0.3s ease-in-out 0.9s both;
        }

        .checkmark-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: #007ea7;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark-check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          stroke-width: 3;
          stroke: #007ea7;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }

        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes scale {
          0%,
          100% {
            transform: none;
          }
          50% {
            transform: scale3d(1.1, 1.1, 1);
          }
        }

        @keyframes fill {
          100% {
            box-shadow: inset 0px 0px 0px 30px transparent;
          }
        }

        .success-content {
          animation: fade-up 0.6s ease-out 0.8s forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .booking-section {
          animation: fade-up 0.6s ease-out 1s forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .upload-section {
          animation: fade-up 0.6s ease-out 1.2s forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .calendar-icon {
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ThankYou;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 md:py-10 bg-[#00296B] text-[#B3B3B3] px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg">Robert B. Summers</h3>
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M21 10V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V10M21 10V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V10M21 10H3M12 14H16"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <a
                href="mailto:robert@examplemortgage.com"
                className="text-[#B3B3B3] hover:text-white transition-colors duration-300"
              >
                robert@examplemortgage.com
              </a>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <a
                href="tel:+15555551234"
                className="text-[#B3B3B3] hover:text-white transition-colors duration-300"
              >
                (555) 555-1234
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <Link
              to="/privacy"
              className="text-[#B3B3B3] hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/partners"
              className="text-[#B3B3B3] hover:text-white transition-colors duration-300"
            >
              Partner Referrals
            </Link>
            <a
              href="https://www.nmlsconsumeraccess.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B3B3B3] hover:text-white transition-colors duration-300"
            >
              NMLS Consumer Access
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1A4B91] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-white">Equal Housing Lender</div>
          </div>
          <div className="text-sm">
            <div>Robert B. Summers | NMLS 231330</div>
            <div>Southwest Funding, LP | NMLS 32139</div>
            <div>© {new Date().getFullYear()} All Rights Reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

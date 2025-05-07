import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 md:py-10 bg-[#00296B] text-[#B3B3B3] px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6">
          <h6 className="text-xl mb-6 text-white md:w-1/2 text-center md:text-left">
            “All consultations are by appointment only. Please use the intake
            form to get started.”
          </h6>
          <div className="flex flex-col items-center md:items-end gap-4">
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

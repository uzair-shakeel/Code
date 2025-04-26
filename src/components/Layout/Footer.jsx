import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 md:py-7 bg-[#00296B] text-[#B3B3B3] px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto h-full flex items-center text-center md:flex-row flex-col justify-between gap-5 md:gap-6">
        <div className="text-sm font-open-sans">
          <span>Robert B. Summers | NMLS 231330</span>
          <span className="mx-2">|</span>
          <span>Southwest Funding, LP | Equal Housing Lender</span>
        </div>
        <a
          href="https://www.nmlsconsumeraccess.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-open-sans hover:text-white transition-colors duration-300"
        >
          NMLS Consumer Access
        </a>
      </div>
    </footer>
  );
};

export default Footer; 
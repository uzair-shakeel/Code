import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeHero = () => {
  const [isSticky, setIsSticky] = useState(false);

  // Add scroll event listener to show/hide sticky button
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight =
        document.querySelector(".hero-section")?.offsetHeight || 0;
      setIsSticky(window.scrollY > heroHeight - 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="h-[80vh] bg-charcoal relative hero-section">
        <div className="w-full h-full flex flex-col justify-center">
          <div className="text-center px-4">
            <h1 className="text-[26px] sm:text-[48px] font-montserrat font-bold text-white mb-3 md:mb-6 animate-fadeIn">
              Get Preapproved for a Home in Minutes
            </h1>
            <h3 className="text-base sm:text-[20px] text-light-gray mb-8 font-open-sans animate-slideUp">
              Even with average credit. No pressure. Just clarity.
            </h3>
            <Link
              to="/prequalification"
              className="inline-block bg-gold text-white font-bold py-3 px-6 rounded-[8px] hover:shadow-lg hover:shadow-[#FDC500]/50 transition-all duration-300 animate-buttonPulse"
            >
              Start My FHA Preapproval
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky CTA Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          isSticky ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <Link
          to="/prequalification"
          className="flex items-center gap-2 bg-gold text-white font-bold py-3 px-5 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#FDC500]/30 transform transition-all duration-300 hover:scale-105"
        >
          <span>Get Preapproved Now</span>
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes buttonPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s 0.3s ease-out forwards;
          opacity: 0;
        }

        .animate-buttonPulse {
          animation: buttonPulse 2s 1s infinite;
        }
      `}</style>
    </>
  );
};

export default HomeHero;

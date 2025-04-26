import React from "react";

const ValueProps = () => {
  return (
    <section className="py-16 px-6 bg-charcoal">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 relative">
          <span className="relative inline-block">
            FHA Loan Benefits
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gold"></span>
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card bg-[#1A1A1A] rounded-lg p-6 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl">
            <div className="text-5xl mb-5 feature-icon">💰</div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-3">
              3.5% Down
            </h3>
            <p className="text-[#B3B3B3]">
              Get into your home with a low down payment requirement
            </p>
          </div>

          <div className="feature-card bg-[#1A1A1A] rounded-lg p-6 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl delay-75">
            <div className="text-5xl mb-5 feature-icon">💳</div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-3">
              580+ Credit OK
            </h3>
            <p className="text-[#B3B3B3]">
              FHA loans are more lenient on credit score requirements
            </p>
          </div>

          <div className="feature-card bg-[#1A1A1A] rounded-lg p-6 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl delay-100">
            <div className="text-5xl mb-5 feature-icon">🏡</div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-3">
              Gift Funds Allowed
            </h3>
            <p className="text-[#B3B3B3]">
              Your down payment can come from family members or other sources
            </p>
          </div>

          <div className="feature-card bg-[#1A1A1A] rounded-lg p-6 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl delay-150">
            <div className="text-5xl mb-5 feature-icon">⏱️</div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-3">
              Close in 14–21 Days
            </h3>
            <p className="text-[#B3B3B3]">
              Get into your new home quickly with our streamlined process
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/prequalification"
            className="inline-block bg-gold text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:shadow-[#FDC500]/30 transform transition-all duration-300 hover:translate-y-[-3px]"
          >
            Check Your FHA Eligibility
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
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

        .feature-icon {
          animation: pulse 3s infinite ease-in-out;
        }

        .feature-card:hover .feature-icon {
          animation-duration: 1.5s;
        }
      `}</style>
    </section>
  );
};

export default ValueProps;

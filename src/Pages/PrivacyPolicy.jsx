import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal py-8 sm:py-12 px-4 md:px-8 pt-[95px] md:pt-[110px]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg p-6 md:p-10 animate-fadeIn">
          <h1 className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-8 pb-4 border-b border-gray-800 text-center md:text-left">
            Privacy Policy
          </h1>

          <div className="space-y-6 font-open-sans text-[#B3B3B3] text-base md:text-lg">
            <p>
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <h2 className="text-xl font-montserrat font-semibold text-white mt-8 mb-4">
              1. Introduction
            </h2>
            <p>
              At Robert B. Summers, we respect your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit our website or use our services.
            </p>

            <h2 className="text-xl font-montserrat font-semibold text-white mt-8 mb-4">
              2. Information We Collect
            </h2>
            <p>
              We may collect personal information that you voluntarily provide
              to us when you express interest in obtaining information about our
              products or services, when you participate in activities on our
              website, or otherwise when you contact us.
            </p>
            <p className="mt-4">
              The personal information we collect may include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Mailing address and ZIP code</li>
              <li>
                Financial information (such as income range and credit score)
              </li>
              <li>Demographic information (such as homebuyer status)</li>
            </ul>

            <h2 className="text-xl font-montserrat font-semibold text-white mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <p>
              We may use the information we collect for various purposes,
              including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing your mortgage prequalification or preapproval</li>
              <li>Communicating with you about your application or inquiry</li>
              <li>Sending you marketing and promotional communications</li>
              <li>Responding to your comments, questions, and requests</li>
            </ul>

            <h2 className="text-xl font-montserrat font-semibold text-white mt-8 mb-4">
              4. Disclosure of Your Information
            </h2>
            <p>We may share information in the following situations:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>With service providers who perform services for us</li>
              <li>
                With mortgage lenders and financial institutions to process your
                application
              </li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and interests</li>
            </ul>

            <h2 className="text-xl font-montserrat font-semibold text-white mt-8 mb-4">
              5. Your Privacy Rights
            </h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, such as the right to access, correct,
              or delete your personal information.
            </p>

            <h2 className="text-xl font-montserrat font-semibold text-white mt-8 mb-4">
              6. Contact Us
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <p className="mt-4 text-white">
              Robert B. Summers
              <br />
              Email: robert@examplemortgage.com
              <br />
              Phone: (555) 555-1234
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;

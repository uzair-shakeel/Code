import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-charcoal px-4 md:px-8 pb-10 pt-28 md:pt-[110px]">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow md:p-8">
          <h1 className="text-[26px] sm:text-[48px] text-white font-montserrat font-bold mb-6">
            Privacy Policy
          </h1>
          
          <div className="font-open-sans text-base text-light-gray">
            <p className="mb-4">
              At our company, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
            </p>
            
            <p className="mb-4">
              We collect personal identification information, financial information for applications, property details, 
              and usage analytics to provide you with the best service possible.
            </p>
            
            <p className="mb-4">
              Your data is protected through encryption, regular security assessments, secure storage practices, 
              and comprehensive employee training on data protection protocols.
            </p>
            
            <p className="mb-4">
              You have the right to access, correct, or delete your personal information at any time.
              For questions about our privacy practices, please contact us at privacy@example.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
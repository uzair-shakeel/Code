import React from 'react';
import ContactForm from '../components/PartnerReferral/ContactForm';
import FeaturesSection from '../components/PartnerReferral/FeaturesSection';

const PartnerReferral = () => {
  return (
    <div className="min-h-screen bg-charcoal pt-[86px] md:pt-[96px]">
      <section className="bg-charcoal text-white px-4 md:px-8 py-20">
        <div className="max-w-[1440px] w-full mx-auto">
          <div className="text-center">
            <h1 className="text-[26px] sm:text-[48px] text-white font-montserrat font-bold mb-4">
              Let's Work Together
            </h1>
            <h3 className="text-base sm:text-xl text-light-gray mb-8 font-open-sans">
              Agents, builders, and consultants — refer your clients confidently.
            </h3>
          </div>
        </div>
      </section>

      <FeaturesSection/>
      <ContactForm/>
    </div>
  );
};

export default PartnerReferral;
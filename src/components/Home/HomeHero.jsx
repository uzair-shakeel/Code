import React from 'react';
import { Link } from 'react-router-dom';

const HomeHero = () => {
    return (
        <section className="h-[80vh] bg-charcoal relative">
            <div className="w-full h-full flex flex-col justify-center">
                <div className="text-center px-4">
                    <h1 className="text-[26px] sm:text-[48px] font-montserrat font-bold text-white mb-3 md:mb-6">
                        Get Preapproved for a Home in Minutes
                    </h1>
                    <h3 className="text-base sm:text-[20px] text-light-gray mb-8 font-open-sans">
                        Even with average credit. No pressure. Just clarity.
                    </h3>
                    <Link
                        to="/prequalification"
                        className="inline-block bg-gold text-white font-bold py-3 px-6 rounded-[8px] hover:shadow-lg hover:shadow-[#FDC500]/50 transition-all duration-300"
                    >
                        Start My FHA Preapproval
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeHero; 
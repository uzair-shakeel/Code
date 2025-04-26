import React from 'react';

const ValueProps = () => {
    return (
        < section className= "pb-16 px-6 bg-charcoal flex items-center justify-center" >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] rounded-lg p-5 text-center h-[180px] w-[180px] flex flex-col items-center justify-center">
                    <div className="text-4xl mb-4">💰</div>
                    <h3 className="text-base font-montserrat font-bold text-white mb-2">3.5% Down</h3>
                </div>  
                <div className="bg-[#1A1A1A] rounded-lg p-6 text-center h-[180px] sm:w-[180px] flex flex-col items-center justify-center">
                    <div className="text-4xl mb-4">💳</div>
                    <h3 className="text-base font-montserrat font-bold text-white mb-2">580+ Credit OK</h3>
                </div>
                <div className="bg-[#1A1A1A] rounded-lg p-6 text-center h-[180px] w-[180px] flex flex-col items-center justify-center">
                    <div className="text-4xl mb-4">🏡</div>
                    <h3 className="text-base font-montserrat font-bold text-white mb-2">Gift Funds Allowed</h3>
                </div>
                <div className="bg-[#1A1A1A] rounded-lg p-6 text-center h-[180px] w-[180px] flex flex-col items-center justify-center">
                    <div className="text-4xl mb-4">⏱️</div>
                    <h3 className="text-base font-montserrat font-bold text-white mb-2">Close in 14–21 Days</h3>
                </div>
            </div>
      </section >
  );
};

export default ValueProps; 
import React from 'react'

const FeaturesSection = () => {
     return (
          <section className='flex items-center justify-center px-4'>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-[#1A1A1A] rounded-lg p-5 text-center h-[180px] sm:w-[180px] flex flex-col items-center justify-center">
                         <div className="text-4xl mb-4">💼</div>
                         <h3 className="text-base font-montserrat font-bold text-white mb-2">Co-branded funnels</h3>
                    </div>
                    <div className="bg-[#1A1A1A] rounded-lg p-6 text-center h-[180px] sm:w-[180px] flex flex-col items-center justify-center">
                         <div className="text-4xl mb-4">📊</div>
                         <h3 className="text-base font-montserrat font-bold text-white mb-2">Live status updates</h3>
                    </div>
                    <div className="bg-[#1A1A1A] rounded-lg p-6 text-center h-[180px] sm:w-[180px] flex flex-col items-center justify-center">
                         <div className="text-4xl mb-4">🕒</div>
                         <h3 className="text-base font-montserrat font-bold text-white mb-2">Fast preapprovals</h3>
                    </div>
               </div>
          </section>
     )
}

export default FeaturesSection
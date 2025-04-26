import React from 'react'

const ContactForm = () => {
     return (
          <section className="py-16 px-4 md:px-8 text-white max-w-[1440px] w-full mx-auto">
               <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-montserrat text-white font-bold mb-6 text-center">
                         Become a Partner
                    </h2>
                    <form className="space-y-6">
                         <div>
                              <label className="block text-base font-montserrat mb-2">Name</label>
                              <input type="text" className="w-full text-charcoal bg-light-gray px-3 py-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-teal" />
                         </div>
                         <div>
                              <label className="block text-base font-montserrat mb-2">Email</label>
                              <input type="email" className="w-full text-charcoal bg-light-gray px-3 py-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-teal" />
                         </div>
                         <div>
                              <label className="block text-base font-montserrat mb-2">Company</label>
                              <input type="text" className="w-full text-charcoal bg-light-gray px-3 py-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-teal" />
                         </div>
                         <div>
                              <label className="block text-base font-montserrat mb-2">Message</label>
                              <textarea rows="4" className="w-full text-charcoal bg-light-gray px-3 py-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-teal"></textarea>
                         </div>
                         <button
                              type="submit"
                              className="w-full bg-gold text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                         >
                              Partner With Us
                         </button>
                    </form>
               </div>
          </section>
     )
}

export default ContactForm
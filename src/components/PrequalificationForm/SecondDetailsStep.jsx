import React from 'react';
import FormInput from '../Layout/FormInput';
import RadioGroup from '../Layout/RadioGroup';
import FormSelect from '../Layout/FormSelect';

const SecondDetailsStep = ({ formData, errors, handleInputChange, handleRadioChange }) => {
     return (
          <div className="space-y-4 sm:space-y-6">
               <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-white mb-4 sm:mb-6">Property Details</h2>
               <div className="space-y-4">
                    <FormInput
                         label="ZIP Code"
                         name="zipCode"
                         type="text"
                         value={formData.zipCode}
                         onChange={handleInputChange}
                         error={errors.zipCode}
                         placeholder="Enter ZIP code"
                    />

                    <RadioGroup
                         label="First-Time Buyer?"
                         name="firstTimeBuyer"
                         selectedValue={formData.firstTimeBuyer}
                         onChange={handleRadioChange}
                         options={[
                              { value: 'yes', label: 'Yes' },
                              { value: 'no', label: 'No' }
                         ]}
                         error={errors.firstTimeBuyer}
                    />

                    <FormSelect
                         label="Credit Score Range"
                         name="creditScore"
                         value={formData.creditScore}
                         onChange={handleInputChange}
                         error={errors.creditScore}
                         options={[
                              { value: '', label: 'Select credit score range' },
                              { value: '580-619', label: '580-619' },
                              { value: '620-679', label: '620-679' },
                              { value: '680-739', label: '680-739' },
                              { value: '740+', label: '740+' }
                         ]}
                    />
               </div>
          </div>
     );
};

export default SecondDetailsStep;
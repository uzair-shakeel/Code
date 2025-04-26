import React from 'react';
import FormSelect from '../Layout/FormSelect';
import RadioGroup from '../Layout/RadioGroup';

const ThirdFinancialInfoStep = ({ formData, errors, handleInputChange, handleRadioChange }) => {
     return (
          <div className="space-y-4 sm:space-y-6">
               <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-white mb-4 sm:mb-6">Financial Information</h2>
               <div className="space-y-4">
                    <FormSelect
                         label="Income Range"
                         name="incomeRange"
                         value={formData.incomeRange}
                         onChange={handleInputChange}
                         error={errors.incomeRange}
                         options={[
                              { value: '', label: 'Select income range' },
                              { value: '0-50k', label: '$0 - $50,000' },
                              { value: '50k-100k', label: '$50,000 - $100,000' },
                              { value: '100k-150k', label: '$100,000 - $150,000' },
                              { value: '150k+', label: '$150,000+' }
                         ]}
                    />

                    <RadioGroup
                         label="Loan Type"
                         name="loanType"
                         selectedValue={formData.loanType}
                         onChange={handleRadioChange}
                         options={[
                              { value: 'FHA', label: 'FHA' },
                              { value: 'Conventional', label: 'Conventional' },
                              { value: 'VA', label: 'VA' }
                         ]}
                         error={errors.loanType}
                         vertical={true}
                    />

                    <FormSelect
                         label="Timeline to Buy"
                         name="timeline"
                         value={formData.timeline}
                         onChange={handleInputChange}
                         error={errors.timeline}
                         options={[
                              { value: '', label: 'Select timeline' },
                              { value: '0-3', label: '0-3 months' },
                              { value: '3-6', label: '3-6 months' },
                              { value: '6-12', label: '6-12 months' },
                              { value: '12+', label: '12+ months' }
                         ]}
                    />
               </div>
          </div>
     );
};

export default ThirdFinancialInfoStep;
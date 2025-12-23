// src/pages/resume/SummaryForm.jsx

import React from 'react';
import TextArea from '../../components/TextArea';

export default function SummaryForm({ summary, handleChange }) {
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-blue-600">Professional Summary (ATS Friendly)</h3>

      <p className="text-sm text-gray-600">
        Write a 3-4 sentence summary. **Use Keywords** from the job description and highlight your biggest achievements. (ATS will scan this first)
      </p>
      
      <TextArea
        label="Summary"
        name="summary"
        value={summary}
        onChange={(e) => handleChange('summary', 'value', e.target.value)}
        rows="5"
        placeholder="e.g., Highly skilled Java Developer with 5 years of experience in enterprise application development. Achieved 20% performance improvement in billing systems. Seeking challenging roles in Fintech."
        required
      />
      
    </div>
  );
}
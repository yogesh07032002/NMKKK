// src/pages/resume/SkillsForm.jsx

import React from 'react';
import TextArea from '../../components/TextArea';

export default function SkillsForm({ skills, handleChange }) {
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-blue-600">Skills & Tools</h3>

      <p className="text-sm text-gray-600">List your skills separated by **commas** (e.g., JavaScript, React, Tailwind CSS, Problem Solving). **ATS Keywords** are crucial here!</p>
      
      <TextArea
        label="Technical and Soft Skills"
        name="skills"
        value={skills}
        onChange={(e) => handleChange('skills', 'value', e.target.value)}
        rows="5"
        placeholder="e.g., JavaScript, React, Node.js, Python, AWS, Agile Methodology, Communication"
        required
      />
      
    </div>
  );
}
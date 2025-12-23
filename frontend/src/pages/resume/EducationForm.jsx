// src/pages/resume/EducationForm.jsx

import React from 'react';
import Input from '../../components/Input';
import { Trash2 } from 'lucide-react';

export default function EducationForm({ educationList, handleChange, setFormData, formData }) {
  
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...educationList, { degree: "", year: "", institute: "" }]
    });
  };

  const removeEducation = (index) => {
    // Prevent removing the last item if it is empty, or allow if multiple exist
    if (educationList.length === 1 && !educationList[0].degree) return;
    
    const updatedList = educationList.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      // Ensure at least one empty entry remains if the list becomes empty
      education: updatedList.length > 0 ? updatedList : [{ degree: "", year: "", institute: "" }]
    });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-blue-600">Educational Background</h3>

      {educationList.map((edu, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-4 relative">
          
          <h4 className="font-medium text-gray-700">Education Entry {index + 1}</h4>

          {/* Allow removal only if more than one entry exists */}
          {educationList.length > 1 && (
            <button 
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              type="button"
            >
              <Trash2 size={20} />
            </button>
          )}

          <Input
            label="Degree/Course"
            type="text"
            name="degree"
            value={edu.degree}
            onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
            placeholder="e.g., B.E. Computer Science"
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Institute/University"
              type="text"
              name="institute"
              value={edu.institute}
              onChange={(e) => handleChange('education', 'institute', e.target.value, index)}
              placeholder="e.g., University of Mumbai"
            />
            <Input
              label="Years/Graduation Date"
              type="text"
              name="year"
              value={edu.year}
              onChange={(e) => handleChange('education', 'year', e.target.value, index)}
              placeholder="e.g., 2018 - 2022"
            />
          </div>

        </div>
      ))}
      
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={addEducation}
      >
        + Add More Education
      </button>
      
    </div>
  );
}
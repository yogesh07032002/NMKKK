// src/pages/resume/CertificationsForm.jsx

import React from 'react';
import Input from '../../components/Input';
import { Trash2 } from 'lucide-react';

export default function CertificationsForm({ certificationsList, handleChange, setFormData, formData }) {
  
  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...certificationsList, { name: "", issuer: "", year: "" }]
    });
  };

  const removeCertification = (index) => {
    if (certificationsList.length === 1 && !certificationsList[0].name) return;
    
    const updatedList = certificationsList.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      certifications: updatedList.length > 0 ? updatedList : [{ name: "", issuer: "", year: "" }]
    });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-blue-600">Certifications & Licenses</h3>

      {certificationsList.map((cert, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-4 relative">
          
          <h4 className="font-medium text-gray-700">Certification {index + 1}</h4>

          {certificationsList.length > 1 && (
            <button 
              onClick={() => removeCertification(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              type="button"
            >
              <Trash2 size={20} />
            </button>
          )}

          <Input
            label="Certification Name"
            type="text"
            name="name"
            value={cert.name}
            onChange={(e) => handleChange('certifications', 'name', e.target.value, index)}
            placeholder="e.g., AWS Certified Cloud Practitioner"
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Issuing Organization"
              type="text"
              name="issuer"
              value={cert.issuer}
              onChange={(e) => handleChange('certifications', 'issuer', e.target.value, index)}
              placeholder="e.g., Amazon Web Services"
            />
            <Input
              label="Year Achieved"
              type="text"
              name="year"
              value={cert.year}
              onChange={(e) => handleChange('certifications', 'year', e.target.value, index)}
              placeholder="e.g., 2023"
            />
          </div>

        </div>
      ))}
      
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={addCertification}
      >
        + Add Certification
      </button>
      
    </div>
  );
}
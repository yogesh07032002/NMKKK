// src/pages/resume/PersonalForm.jsx

import React from 'react';
import Input from '../../components/Input';

export default function PersonalForm({ data, handleChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-blue-600">Personal Information</h3>
      
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        value={data.fullName}
        onChange={(e) => handleChange('personal', 'fullName', e.target.value)}
        placeholder="e.g., Jane Doe"
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => handleChange('personal', 'email', e.target.value)}
          placeholder="e.g., jane@example.com"
          required
        />
        
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={data.phone}
          onChange={(e) => handleChange('personal', 'phone', e.target.value)}
          placeholder="e.g., 9876543210"
        />
      </div>

      <Input
        label="Address/Location"
        type="text"
        name="address"
        value={data.address}
        onChange={(e) => handleChange('personal', 'address', e.target.value)}
        placeholder="e.g., Mumbai, India (Optional)"
      />
      
      <h4 className="text-lg font-semibold border-b pb-2 pt-4 text-gray-700">Professional Links (Optional)</h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="LinkedIn Profile URL"
          type="url"
          name="linkedin"
          value={data.linkedin}
          onChange={(e) => handleChange('personal', 'linkedin', e.target.value)}
          placeholder="e.g., https://linkedin.com/in/..."
        />
        <Input
          label="GitHub Profile URL"
          type="url"
          name="github"
          value={data.github}
          onChange={(e) => handleChange('personal', 'github', e.target.value)}
          placeholder="e.g., https://github.com/..."
        />
        <Input
          label="Portfolio/Website URL"
          type="url"
          name="portfolio"
          value={data.portfolio}
          onChange={(e) => handleChange('personal', 'portfolio', e.target.value)}
          placeholder="e.g., https://yourportfolio.com"
        />
      </div>
      
    </div>
  );
}
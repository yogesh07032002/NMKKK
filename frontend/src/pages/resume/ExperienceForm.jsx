// src/pages/resume/ExperienceForm.jsx

import React from 'react';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { Trash2, Plus } from 'lucide-react';

export default function ExperienceForm({ experienceList, handleChange, setFormData, formData }) {
  
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...experienceList, { company: "", role: "", duration: "", achievements: [""] }]
    });
  };

  const removeExperience = (index) => {
    if (experienceList.length === 1 && !experienceList[0].role) return;
    
    const updatedList = experienceList.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      experience: updatedList.length > 0 ? updatedList : [{ company: "", role: "", duration: "", achievements: [""] }]
    });
  };

  const handleAchievementChange = (expIndex, achIndex, value) => {
    const updatedExperience = [...experienceList];
    // Ensure the array structure is maintained
    if (!updatedExperience[expIndex].achievements) {
        updatedExperience[expIndex].achievements = [""];
    }
    updatedExperience[expIndex].achievements[achIndex] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addAchievement = (index) => {
    const updatedExperience = [...experienceList];
    if (!updatedExperience[index].achievements) {
        updatedExperience[index].achievements = [];
    }
    updatedExperience[index].achievements.push("");
    setFormData({ ...formData, experience: updatedExperience });
  };

  const removeAchievement = (expIndex, achIndex) => {
    const updatedExperience = [...experienceList];
    if (!updatedExperience[expIndex].achievements) return;

    updatedExperience[expIndex].achievements = updatedExperience[expIndex].achievements.filter((_, i) => i !== achIndex);
    
    // Ensure at least one achievement field remains if all are deleted
    if (updatedExperience[expIndex].achievements.length === 0) {
      updatedExperience[expIndex].achievements.push("");
    }
    setFormData({ ...formData, experience: updatedExperience });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-blue-600">Work Experience (ATS Focus)</h3>

      {experienceList.map((exp, expIndex) => (
        <div key={expIndex} className="border p-4 rounded-lg space-y-4 relative">
          
          <h4 className="font-medium text-gray-700">Experience Entry {expIndex + 1}</h4>

          {experienceList.length > 1 && (
            <button 
              onClick={() => removeExperience(expIndex)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              type="button"
            >
              <Trash2 size={20} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Job Role/Title"
              type="text"
              name="role"
              value={exp.role}
              onChange={(e) => handleChange('experience', 'role', e.target.value, expIndex)}
              placeholder="e.g., Software Developer"
              required
            />
            <Input
              label="Company Name"
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) => handleChange('experience', 'company', e.target.value, expIndex)}
              placeholder="e.g., Tech Solutions Inc."
            />
          </div>
          
          <Input
            label="Duration"
            type="text"
            name="duration"
            value={exp.duration}
            onChange={(e) => handleChange('experience', 'duration', e.target.value, expIndex)}
            placeholder="e.g., Jan 2022 - Present"
          />
          
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Achievements (Use Quantifiable Results: Action Verb + Numbers)
            </label>
            {/* Map through achievements array */}
            {(exp.achievements || [""]).map((achievement, achIndex) => (
              <div key={achIndex} className="flex gap-2 mb-2 items-start">
                <TextArea
                  name={`achievement-${achIndex}`}
                  value={achievement}
                  onChange={(e) => handleAchievementChange(expIndex, achIndex, e.target.value)}
                  rows="1"
                  placeholder="e.g., Increased system performance by 30% by refactoring legacy code."
                />
                {/* Do not allow removal of the last empty achievement field */}
                {(exp.achievements && exp.achievements.length > 1) || (achIndex > 0) ? (
                    <button
                        type="button"
                        onClick={() => removeAchievement(expIndex, achIndex)}
                        className="text-red-500 hover:text-red-700 p-1 mt-2"
                    >
                        <Trash2 size={16} />
                    </button>
                ) : <div className="w-[24px]"></div> // Spacer
                }
              </div>
            ))}
            <button
              type="button"
              onClick={() => addAchievement(expIndex)}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-1"
            >
              <Plus size={16} className="mr-1" /> Add Achievement Bullet
            </button>
          </div>

        </div>
      ))}
      
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={addExperience}
      >
        + Add More Experience
      </button>
      
    </div>
  );
}
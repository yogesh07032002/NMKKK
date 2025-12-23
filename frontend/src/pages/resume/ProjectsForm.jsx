// src/pages/resume/ProjectsForm.jsx

import React from 'react';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { Trash2 } from 'lucide-react';

export default function ProjectsForm({ projectsList, handleChange, setFormData, formData }) {
  
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...projectsList, { title: "", description: "" }]
    });
  };

  const removeProject = (index) => {
    if (projectsList.length === 1 && !projectsList[0].title) return;
    
    const updatedList = projectsList.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      projects: updatedList.length > 0 ? updatedList : [{ title: "", description: "" }]
    });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-blue-600">Projects (Portfolio)</h3>

      {projectsList.map((proj, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-4 relative">
          
          <h4 className="font-medium text-gray-700">Project {index + 1}</h4>

          {projectsList.length > 1 && (
            <button 
              onClick={() => removeProject(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              type="button"
            >
              <Trash2 size={20} />
            </button>
          )}

          <Input
            label="Project Title"
            type="text"
            name="title"
            value={proj.title}
            onChange={(e) => handleChange('projects', 'title', e.target.value, index)}
            placeholder="e.g., E-Commerce Platform using MERN"
            required
          />
          
          <TextArea
            label="Project Description/Summary"
            name="description"
            value={proj.description}
            onChange={(e) => handleChange('projects', 'description', e.target.value, index)}
            rows="3"
            placeholder="Briefly describe the project, your role, and key technologies used."
            required
          />

        </div>
      ))}
      
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={addProject}
      >
        + Add More Projects
      </button>
      
    </div>
  );
}
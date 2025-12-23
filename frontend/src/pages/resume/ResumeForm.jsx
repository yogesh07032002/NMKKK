import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import templates from "../../data/resumeTemplates.json"; 

import {
  User, BookOpen, Briefcase, Star, FolderKanban, Award
} from "lucide-react";

import ResumeSidebar from "../../components/ResumeSidebar";
import TemplateRenderer from "../../components/TemplateRenderer"; 

// Form Component Imports (Ensure these files exist in the same directory)
import PersonalForm from "./PersonalForm";
import SummaryForm from "./SummaryForm"; 
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificationsForm from "./CertificationsForm";


// Default/Initial Data Structure (DUMMY DATA REMOVED)
const initialFormData = {
    personal: { 
      fullName: "", 
      email: "", 
      phone: "", 
      address: "",
      // 🛠️ NEW: Social/Professional Links
      linkedin: "", 
      github: "", 
      portfolio: "", 
    },
    
    summary: "", // Dummy Data Removed
    
    // 🛠️ Blank Array for Education
    education: [{ degree: "", year: "", institute: "" }], 
    
    // 🛠️ Blank Array for Experience (with empty achievements array)
    experience: [{ 
      company: "", 
      role: "", 
      duration: "",
      achievements: [""]
    }],
    
    skills: "", // Dummy Data Removed
    
    // 🛠️ Blank Array for Projects
    projects: [{ title: "", description: "" }], 
    
    // 🛠️ Blank Array for Certifications
    certifications: [{ name: "", issuer: "", year: "" }] 
};

export default function ResumeForm() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const steps = [
    { label: "Personal Info", icon: <User size={18} /> },
    { label: "Summary", icon: <Briefcase size={18} /> },
    { label: "Education", icon: <BookOpen size={18} /> }, 
    { label: "Experience", icon: <Briefcase size={18} /> },
    { label: "Skills", icon: <Star size={18} /> },
    { label: "Projects", icon: <FolderKanban size={18} /> },
    { label: "Certifications", icon: <Award size={18} /> }
  ];

  const selectedTemplate = templates.find((t) => t.id === templateId); 

  const [step, setStep] = useState(1);
  const [collapsed, setCollapsed] = useState(false);

  // Initialize form data with EMPTY structure
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (section, field, value, index = 0) => {
    const updated = { ...formData };
    
    // Handle simple fields (like summary, skills)
    if (section === 'summary' || section === 'skills') {
         updated[section] = value;
    } else if (Array.isArray(updated[section])) {
      // Handle array sections (Education, Experience, Projects, Certifications)
      // Ensure the array index exists before setting the field
      if (!updated[section][index]) {
        updated[section].push({});
      }
      updated[section][index][field] = value;
    } else {
      // Handle object sections (Personal)
      updated[section][field] = value;
    }
    setFormData(updated);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  const goToDownloadPage = () => navigate(`/resume/preview/${templateId}`, { state: { formData: formData } });

  // Render Form Component Based on Step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalForm data={formData.personal} handleChange={handleChange} />;
        
      case 2:
        return <SummaryForm summary={formData.summary} handleChange={handleChange} />;
        
      case 3:
        return (
          <EducationForm 
            educationList={formData.education} 
            handleChange={handleChange} 
            setFormData={setFormData} 
            formData={formData} 
          />
        );
      case 4:
        return (
          <ExperienceForm 
            experienceList={formData.experience} 
            handleChange={handleChange} 
            setFormData={setFormData} 
            formData={formData} 
          />
        );
      case 5:
        return <SkillsForm skills={formData.skills} handleChange={handleChange} />;
      
      case 6:
        return (
          <ProjectsForm 
            projectsList={formData.projects} 
            handleChange={handleChange} 
            setFormData={setFormData} 
            formData={formData} 
          />
        );

      case 7:
        return (
            <CertificationsForm
                certificationsList={formData.certifications} 
                setFormData={setFormData}
                formData={formData}
                handleChange={handleChange}
            />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">

      {/* 1. SIDEBAR */}
      <ResumeSidebar
        steps={steps}
        step={step}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setStep={setStep}
      />

      {/* 2. MAIN CONTENT AREA (FORM + LIVE PREVIEW) */}
      <div className="flex-1 flex transition-all"> 

        {/* LEFT SECTION: FORM INPUT */}
        <div className="w-full lg:w-3/5 p-6 md:p-10">

          {/* Template Header */}
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedTemplate?.name}</h2>
            <p className="text-gray-500">Fill in the details below</p>
          </div>

          {/* =====================  STEP FORMS CONTAINER ===================== */}
          <div className="bg-white p-6 rounded-xl shadow-sm border mx-auto lg:mx-0 min-h-[400px]">
              {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between py-6 max-w-3xl mx-auto lg:mx-0">
            <button
              className={`px-6 py-2 rounded font-medium ${step > 1 ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'invisible'}`}
              onClick={prevStep}
            >
              Back
            </button>

            {step < 7 ? (
              <button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium shadow-md transition"
                onClick={nextStep}
              >
                Next Step
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium shadow-md transition"
                onClick={goToDownloadPage} 
              >
                Preview & Download
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SECTION: LIVE PREVIEW */}
        <div className="hidden lg:block lg:w-2/5 p-6 md:p-10 border-l bg-gray-100 sticky top-0 h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-700">Live Preview</h3>
            <div className="w-full scale-[0.55] origin-top-left shadow-2xl bg-white border border-gray-300 transform">
                <TemplateRenderer data={formData} templateId={templateId} /> 
            </div>
            <p className="text-center text-xs mt-10 text-gray-500">
                (The Preview is scaled down to fit. Click "Preview & Download" for full size.)
            </p>
        </div>
        
      </div>
    </div>
  );
}
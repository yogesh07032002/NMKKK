import React from "react";
import { Mail, Phone, MapPin, Link, Github, Linkedin, Briefcase } from "lucide-react";


const TemplateRenderer = React.forwardRef(({ data, templateId }, ref) => {
 const personal = data?.personal || {}; 
 const summary = data?.summary;
 const education = data?.education || [];
 const experience = data?.experience || [];
 // skills, projects, certifications 
 const skills = data?.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s) : []; 
const projects = data?.projects || [];
const certifications = data?.certifications || [];
  

const shouldRenderContent = personal.fullName && personal.fullName !== "Loading Preview..." && personal.fullName !== ""; 


 // Helper functions (renderContactItem, SectionHeader)
 const renderContactItem = (Icon, text, url) => {
 if (!text) return null;
 const cleanText = text.replace(/^(https?:\/\/)?(www\.)?/i, '').replace(/\/$/, '');

return (
 <div className="flex items-center gap-1.5 text-gray-700 text-[10.5px]">
 <Icon size={11} className="text-gray-500 flex-shrink-0" />
{url ? (
 <a href={url.startsWith('http') ? url : `https://${url}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:underline">
 {cleanText}
 </a>
) : (
<span>{cleanText}</span>
 )}
 </div>
 );
 };

const SectionHeader = ({ title }) => (
<div className="mb-2 pt-2">
 <h2 className="text-base font-bold uppercase tracking-wide text-gray-800">{title}</h2>
<div className="h-0.5 bg-gray-500 w-full mt-0.5"></div>
 </div>
 );

 return (
 <div 
 ref={ref} // 🎯 CRITICAL: ref 
className="resume-page bg-white shadow-xl" 
style={{ fontFamily: 'Georgia, serif', fontSize: '11px', minHeight: '297mm', width: '210mm', padding: '28px' }}
 >

 {shouldRenderContent ? (
         
          <React.Fragment>
              {/* 1. NAME HEADER (Focus on Name) */}
              <header className="text-center pb-3 mb-2">
                <h1 className="text-4xl font-extrabold uppercase text-gray-900 leading-none">{personal.fullName}</h1>
                
                {/* Contact Info (Classic Layout) */}
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-3">
                  {renderContactItem(Mail, personal.email, `mailto:${personal.email}`)}
                  {renderContactItem(Phone, personal.phone, `tel:${personal.phone}`)}
                  {renderContactItem(MapPin, personal.address)}
                  {renderContactItem(Linkedin, 'LinkedIn', personal.linkedin)}
                  {renderContactItem(Github, 'GitHub', personal.github)}
                  {renderContactItem(Link, 'Portfolio', personal.portfolio)}
                </div>
              </header>
              
              {/* 2. Professional Summary */}
              {summary && (
                <section className="mb-4">
                  <SectionHeader title="PROFESSIONAL SUMMARY" />
                  <p className="text-gray-700 leading-snug text-[11px]">{summary}</p>
                </section>
              )}

              {/* 3. Skills Section */}
              {skills.length > 0 && (
                  <section className="mb-4">
                    <SectionHeader title="TECHNICAL SKILLS" />
                    <p className="text-gray-700 text-[11px] leading-snug">
                        <span className="font-bold text-gray-800 mr-2">Core Technologies:</span> {skills.slice(0, 5).join(' • ')} 
                    </p>
                    <p className="text-gray-700 text-[11px] leading-snug">
                        <span className="font-bold text-gray-800 mr-2">Tools & Platforms:</span> {skills.slice(5).join(' • ')} 
                    </p>
                  </section>
              )}

              {/* 4. Experience Section */}
              {experience.length > 0 && experience.some(e => e.role) && (
                <section className="mb-4">
                  <SectionHeader title="PROFESSIONAL EXPERIENCE" />
                  {experience.filter(e => e.role).map((exp, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-start">
                          <p className="font-extrabold text-gray-900 text-[11.5px] leading-tight">{exp.role} | {exp.company}</p>
                          <p className="text-right text-gray-600 text-[10px] whitespace-nowrap">{exp.duration}</p>
                      </div>
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="list-disc ml-5 mt-1 text-gray-700 text-[11px] space-y-0.5">
                          {exp.achievements.filter(a => a).map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              )}

              {/* 5. Projects Section */}
              {projects.length > 0 && projects.some(p => p.title) && (
                <section className="mb-4">
                  <SectionHeader title="KEY PROJECTS" />
                  {projects.filter(p => p.title).map((proj, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-bold text-gray-800 text-[11px] leading-snug">{proj.title}</p>
                      <p className="text-gray-700 text-[10.5px] leading-tight">{proj.description}</p>
                    </div>
                  ))}
                </section>
              )}
              
              {/* 6. Education Section */}
              {education.length > 0 && education.some(e => e.degree) && (
                <section className="mb-4">
                  <SectionHeader title="EDUCATION" />
                  {education.filter(e => e.degree).map((edu, index) => (
                    <div key={index} className="flex justify-between items-start mb-1">
                      <p className="font-bold text-gray-800 text-[11px] leading-snug">{edu.degree}</p>
                      <div className="text-right text-gray-600 text-[10px] whitespace-nowrap">
                        <span className="font-semibold">{edu.institute}</span> | <span>{edu.year}</span>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* 7. Certifications Section */}
              {certifications.length > 0 && certifications.some(c => c.name) && (
                <section className="mb-4">
                  <SectionHeader title="CERTIFICATIONS" />
                  {certifications.filter(c => c.name).map((cert, index) => (
                    <div key={index} className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-gray-800 text-[11px] leading-snug">{cert.name}</p>
                      <div className="text-right text-gray-600 text-[10px] whitespace-nowrap">
                        <span>{cert.issuer}</span> ({cert.year})
                      </div>
                    </div>
                  ))}
                </section>
              )}
          </React.Fragment>

      ) : (
       
          <div className="p-10 text-center text-gray-500">
              Please fill out the form to see your Live Resume Preview!
              <p className="mt-4 text-xs text-gray-400">Current State: Resume data is missing or loading.</p>
          </div>
      )}

 </div>
 );
});

export default TemplateRenderer;
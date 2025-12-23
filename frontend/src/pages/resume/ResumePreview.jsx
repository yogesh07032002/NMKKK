import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Download, ChevronLeft } from "lucide-react";
import TemplateRenderer from "../../components/TemplateRenderer";
import templates from "../../data/resumeTemplates.json";

// PDF libraries
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumePreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const { templateId } = useParams();

    const [showPremiumModal, setShowPremiumModal] = useState(false);

    // Dummy premium status
    const isPremiumUser = false;

    const formData = location.state?.formData;
    const selectedTemplate = templates.find(t => t.id === templateId);

    // Ref for the div we want to export
    const componentRef = useRef(null);

    const isReady =
        formData &&
        formData.personal &&
        formData.personal.fullName &&
        formData.summary;

    // ⭐ PDF Download using html2canvas + jsPDF
    const handleDownloadClick = async () => {
        if (!isReady) return;

        const element = componentRef.current;
        if (!element) return;

        try {
            // Convert DOM to canvas
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            // Create PDF
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${formData?.personal?.fullName || "Resume"}.pdf`);

            // Show premium modal if user is not premium
            if (!isPremiumUser) {
                setShowPremiumModal(true);
            }
        } catch (err) {
            console.error("Error generating PDF:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-center max-w-5xl mx-auto mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded"
                >
                    <ChevronLeft size={18} /> Edit
                </button>

                <h1 className="font-bold text-xl">
                    Resume Preview – {selectedTemplate?.name}
                </h1>

                <button
                    onClick={handleDownloadClick}
                    disabled={!isReady}
                    className={`flex items-center gap-2 px-6 py-2 rounded text-white ${isReady
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    <Download size={18} /> Download PDF
                </button>
            </div>

            {/* Resume */}
            <div className="flex justify-center">
                <div
                    ref={componentRef} // This div will be converted to PDF
                    style={{ width: "210mm", minHeight: "297mm" }}
                >
                    <TemplateRenderer
                        data={formData}
                        templateId={templateId}
                    />
                </div>
            </div>

            {!isReady && (
                <p className="text-center mt-4 text-yellow-700">
                    ⚠️ Please enter Full Name & Summary to enable PDF download
                </p>
            )}

            {/* Premium modal (optional info) */}
            {showPremiumModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
                        <h2 className="text-xl font-semibold mb-3 text-center text-blue-600">
                            Unlock Premium Features
                        </h2>

                        <p className="text-gray-700 text-center mb-5">
                            You can download your resume, but upgrading to Premium unlocks extra features!
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowPremiumModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/upgrade-premium");
                                    setShowPremiumModal(false);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Go Premium
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

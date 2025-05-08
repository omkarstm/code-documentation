import React, { useEffect, useState } from "react";
import { useCodeAnalysisStore, DocType } from "../store/zipStore";
import DocumentationSection from "../components/section/Dashboard/DocumentationSection";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FiDownload, FiShare2 } from "react-icons/fi";

const AllDoc: React.FC = () => {
  const { documentations, fetchDocumentations, loading } = useCodeAnalysisStore();
  const [selectedDoc, setSelectedDoc] = useState<DocType | null>(null);

  useEffect(() => {
    fetchDocumentations();
  }, [fetchDocumentations]);

  const handleDownloadPDF = async () => {
    if (!selectedDoc) return;
    
    const docSection = document.getElementById("documentation-section");
    if (!docSection) return;
    
    try {
      const canvas = await html2canvas(docSection, { 
        scale: 2,
        allowTaint: true,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add first page
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      
      // Add more pages if content overflows
      let heightLeft = imgHeight - pageHeight;
      let position = -pageHeight;
      
      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
      }
      
      pdf.save(`${selectedDoc.name}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleShare = async () => {
    if (!selectedDoc) return;
    
    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedDoc.name,
          text: `Check out this documentation: ${selectedDoc.name}`,
          url: window.location.href
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback - copy link to clipboard
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="w-300 mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">All Documents</h2>
      {loading && <div>Loading...</div>}
      
      {selectedDoc && (
        <div className="sticky top-0 bg-white z-10 p-3 border-b mb-4 flex justify-between items-center">
          <h3 className="font-bold">{selectedDoc.name}</h3>
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-700"
              onClick={handleDownloadPDF}
            >
              <FiDownload /> Download PDF
            </button>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700"
              onClick={handleShare}
            >
              <FiShare2 /> Share
            </button>
          </div>
        </div>
      )}
      
      <div className="flex gap-6">
        <ul className="mb-6 w-64">
          {documentations.map((doc) => (
            <li key={doc._id}>
              <button
                className={`mb-2 block text-left w-full p-2 rounded ${
                  selectedDoc?._id === doc._id 
                    ? "bg-blue-100 text-blue-800 font-medium" 
                    : "text-blue-600 bg-gray-100 cursor-pointer hover:bg-gray-100"
                }`}
                onClick={() => setSelectedDoc(doc)}
              >
                {doc.name}
              </button>
            </li>
          ))}
        </ul>
        
        {selectedDoc && (
          <div className="flex-1">
            <DocumentationSection
              documentation={selectedDoc.content}
              workflow={selectedDoc.workflow}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoc;

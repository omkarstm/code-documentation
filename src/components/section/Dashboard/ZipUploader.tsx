import React, { useState } from "react";
import JSZip from "jszip";
import { FiUploadCloud } from "react-icons/fi";
import BoxGrid from "./BoxGrid";
import { useCodeAnalysisStore } from "../../../store/zipStore";
import FileList from "./FileList";
import DocumentationSection from "./DocumentationSection";
import { isAllowedFile } from "./isAllouedFiles";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ZipUploader: React.FC = () => {
    const [files, setFiles] = useState<string[]>([]);
    const [zipInstance, setZipInstance] = useState<JSZip | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string>("");
    const [docName, setDocName] = useState<string>("");

    const {
        documentation,
        workflow,
        loading,
        error,
        analyzeCodebase,
        saveToDatabase,
    } = useCodeAnalysisStore();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const fileName = file.name.replace(/\.[^/.]+$/, "");
    setDocName(fileName);
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        setZipInstance(zip);

        const filteredFiles = Object.keys(zip.files).filter((name) => {
            const fileObj = zip.files[name];
            return !fileObj.dir && isAllowedFile(name);
        });

        setFiles(filteredFiles);
        setFileContent("");
        setSelectedFile(null);

        // New code to send all files
        const filesToSend = await Promise.all(
            filteredFiles.map(async (fileName) => {
                const file = zip.files[fileName];
                const content = await file.async("string");
                return { name: fileName, content };
            })
        );
        analyzeCodebase(filesToSend);  // Send array of all files
    };

    const handleFileClick = async (fileName: string) => {
        if (!zipInstance) return;
        setSelectedFile(fileName);
        const file = zipInstance.files[fileName];
        if (!file || file.dir) {
            setFileContent("[Not a valid file]");
        } else {
            const content = await file.async("string");
            setFileContent(content);
            // Remove this line to prevent re-analyzing when clicking files
            // analyzeCodebase([{ name: fileName, content }]);
        }
    };

    const handleDownloadPDF = async () => {
        const docSection = document.getElementById("documentation-section");
        if (!docSection) return;
        
        const HTML_Width = docSection.offsetWidth;
        const HTML_Height = docSection.offsetHeight;
        const top_left_margin = 15;
        const PDF_Width = HTML_Width + (top_left_margin * 2);
        const PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
        const canvas_image_width = HTML_Width;
        const canvas_image_height = HTML_Height;
        
        // Calculate total pages needed
        const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
        
        const canvas = await html2canvas(docSection, { 
            scale: 2,
            allowTaint: true,
            useCORS: true,
            logging: false
        });
        
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        
        // Add first page
        pdf.addImage(imgData, 'JPEG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        
        // Add additional pages as needed
        for (let i = 1; i <= totalPDFPages; i++) {
            pdf.addPage([PDF_Width, PDF_Height], 'p');
            pdf.addImage(
                imgData, 
                'JPEG', 
                top_left_margin, 
                -(PDF_Height * i) + (top_left_margin * 4), 
                canvas_image_width, 
                canvas_image_height
            );
        }
        
        pdf.save("documentation.pdf");
    };
    
    const handleSaveToDatabase = async () => {
        if (!docName.trim()) {
            alert("Please enter a name for the documentation");
            return;
        }
        
        const success = await saveToDatabase(docName);
        if (success) {
            alert("Documentation saved successfully!");
            setDocName("");
        }
    };

    return (
        <div className="px-4 flex flex-col items-center">
            {/* Show the uploader only when not loading or analyzing */}
            {!loading && !documentation && (
                <div className="w-full max-w-xl text-center relative">
                    <label
                        htmlFor="zip-upload"
                        className="cursor-pointer bg-transparent w-150 p-10 flex flex-col items-center justify-center transition-all"
                    >
                        <BoxGrid />
                        <FiUploadCloud className="h-30 w-20 text-blue-600 mb-2" />
                        <span className="text-gray-800 font-medium">Drag & drop or click to upload</span>
                        <input
                            id="zip-upload"
                            type="file"
                            accept=".zip"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <p className="text-gray-600 text-[10px]">
                            Supports TypeScript, JavaScript, HTML and more inside the <code>src/</code> folder
                        </p>
                    </label>
                </div>
            )}

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {/* Show loading indicator and/or analysis results */}
            {(loading || files.length > 0) && (
                <div className="mt-6 flex flex-col items-center w-full">
                    {loading && <div className="text-blue-600 mb-4">Analyzing codebase...</div>}

                    {
                        !loading && 
                        <div>
<button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                onClick={handleSaveToDatabase}
                            >
                                Save to Database
                            </button>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={handleDownloadPDF}
                        >
                            Download PDF
                        </button>
                        </div>
                    }
                    <div className="flex justify-center w-full  gap-5">

                        {files.length > 0 && (
                            <FileList files={files} selectedFile={selectedFile} onFileClick={handleFileClick} />
                        )}
                        <DocumentationSection documentation={documentation} workflow={workflow} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ZipUploader;

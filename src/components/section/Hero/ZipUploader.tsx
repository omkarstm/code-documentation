import React, { useState } from "react";
import JSZip from "jszip";
import { FiUploadCloud } from "react-icons/fi"; // Feather icon for upload
import BoxGrid from "./BoxGrid";

const ALLOWED_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".html"];

function isAllowedFile(name: string): boolean {
    const normalized = name.replace(/\\/g, "/");
    if (!normalized.includes("/src/") && !normalized.startsWith("src/")) return false;
    if (normalized.endsWith("package.json")) return true;
    return ALLOWED_EXTENSIONS.some(ext => normalized.endsWith(ext));
}

const ZipUploader: React.FC = () => {
    const [files, setFiles] = useState<string[]>([]);
    const [zipInstance, setZipInstance] = useState<JSZip | null>(null);
    const [fileContent, setFileContent] = useState<string>("");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        setZipInstance(zip);

        const filteredFiles = Object.keys(zip.files).filter((name) => {
            const fileObj = zip.files[name];
            return !fileObj.dir && isAllowedFile(name);
        });

        setFiles(filteredFiles);
        setFileContent("");
    };

    const handleFileClick = async (fileName: string) => {
        if (!zipInstance) return;
        const file = zipInstance.files[fileName];
        if (!file || file.dir) {
            setFileContent("[Not a valid file]");
        } else {
            const content = await file.async("string");
            setFileContent(content);
        }
    };

    return (
        <div className=" px-4 flex flex-col items-center">
            <div className="w-full max-w-xl text-center relative">
                <label
                    htmlFor="zip-upload"
                    className="cursor-pointer bg-tranparent w-150   p-10 flex flex-col items-center justify-center   transition-all"
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
                    <p className="text-gray-600 text-[10px] ">Supports TypeScript, JavaScript, HTML and more inside the <code>src/</code> folder</p>
                </label>
            </div>
        </div>
    );
};

export default ZipUploader;

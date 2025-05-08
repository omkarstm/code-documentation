import React from "react";
import { FaJs, FaFileCode, FaHtml5, FaCss3Alt, FaFileAlt, FaFile } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

interface FileListProps {
    files: string[];
    selectedFile: string | null;
    onFileClick: (fileName: string) => void;
}

// Helper to get file extension
function getFileExt(path: string) {
    const name = path.split("/").pop() || path;
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

// Map extensions to icons
function getFileIcon(ext: string) {
    switch (ext) {
        case "js":
        case "jsx":
            return <FaJs className="text-yellow-500" />;
        case "ts":
        case "tsx":
            return <SiTypescript className="text-blue-600" />;
        case "html":
            return <FaHtml5 className="text-orange-600" />;
        case "css":
        case "scss":
            return <FaCss3Alt className="text-blue-400" />;
        case "json":
            return <FaFileCode className="text-green-600" />;
        case "md":
        case "txt":
            return <FaFileAlt className="text-gray-400" />;
        default:
            return <FaFile className="text-gray-300" />;
    }
}

function getFileName(path: string) {
    return path.split("/").pop() || path;
}

const FileList: React.FC<FileListProps> = ({ files, selectedFile, onFileClick }) => (
    <div className="pr-2">
        <h3 className="font-bold mb-4 px-4 pt-4 text-lg">Files</h3>
        <ul className="space-y-1 px-2 pb-4">
            {files.map((f) => {
                const ext = getFileExt(f);
                return (
                    <li
                        key={f}
                        className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition
                            ${selectedFile === f ? "bg-blue-100 text-blue-500 font-semibold" : "hover:bg-gray-100"}
                        `}
                        onClick={() => onFileClick(f)}
                        title={f}
                    >
                        <span className="flex-shrink-0 text-lg">
                            {getFileIcon(ext)}
                        </span>
                        <span className="truncate">{getFileName(f)}</span>
                    </li>
                );
            })}
        </ul>
    </div>
);

export default FileList;

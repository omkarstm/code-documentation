import React from "react";

interface FileContentProps {
    content: string;
}

const FileContent: React.FC<FileContentProps> = ({ content }) => (
    <div className="w-200 pl-2">
        <h3 className="font-bold mb-2">File Content</h3>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto" style={{ maxHeight: 250 }}>
            {content}
        </pre>
    </div>
);

export default FileContent;

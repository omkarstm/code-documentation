import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FiBook, FiCode, FiLayers, FiPackage,  } from "react-icons/fi";
import mermaid from "mermaid";

interface DocumentationSectionProps {
  documentation?: string;
  workflow?: string;
}

const DocumentationSection: React.FC<DocumentationSectionProps> = ({ documentation, workflow }) => {
  useEffect(() => {
    if (workflow) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
      });
      mermaid.contentLoaded();
    }
  }, [workflow]);

  if (!documentation && !workflow) return null;

  return (
    <div className="documentation-container" id="documentation-section">
      {documentation && (
        <div className="documentation-section">
          <div className="documentation-header">
            <FiBook className="icon" />
            <h2>Documentation</h2>
          </div>
          
          <div className="documentation-content">
            <ReactMarkdown
              components={{
                h3: ({node, ...props}) => {
                  const title = props.children?.toString() || '';
                  let icon = <FiLayers />;
                  
                  if (title.includes('Libraries')) icon = <FiPackage />;
                  if (title.includes('Components')) icon = <FiLayers />;
                  if (title.includes('Functions')) icon = <FiLayers />;
                  
                  return (
                    <h3 className="section-heading">
                      <span className="section-icon">{icon}</span>
                      <span {...props} />
                    </h3>
                  );
                },
                strong: ({node, ...props}) => <strong className="highlight" {...props} />,
                code: ({node, ...props}) => <code className="code-block" {...props} />,
                pre: ({node, ...props}) => <pre className="pre-block" {...props} />
              }}
            >
              {documentation}
            </ReactMarkdown>
          </div>
        </div>
      )}
      
      {workflow && (
        <div className="workflow-section">
          <div className="workflow-header">
            <FiCode className="icon" />
            <h2>Workflow Diagram</h2>
          </div>
          <div className="workflow-content">
            <div className="mermaid-container">
              <div className="mermaid">{workflow}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentationSection;

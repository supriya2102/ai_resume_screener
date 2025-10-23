import { useState, useRef } from 'react';
import { Upload, FileText, Loader2, Zap } from 'lucide-react';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  isScanning: boolean;
}

function UploadSection({ onFileUpload, isScanning }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="glass-effect rounded-2xl p-8 border border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <Upload className="w-6 h-6 text-neon-blue" />
        <h2 className="text-2xl font-bold text-white">Upload Resume</h2>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300 group
          ${isDragging
            ? 'border-neon-blue bg-neon-blue/10 scale-105'
            : 'border-dark-border hover:border-neon-purple/50 hover:bg-dark-card/50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          {isScanning ? (
            <>
              <Loader2 className="w-16 h-16 text-neon-blue animate-spin" />
              <div className="space-y-2">
                <p className="text-lg font-semibold text-white">Scanning Resume...</p>
                <p className="text-sm text-gray-400">AI is analyzing the document</p>
              </div>
            </>
          ) : fileName ? (
            <>
              <FileText className="w-16 h-16 text-neon-green" />
              <div className="space-y-2">
                <p className="text-lg font-semibold text-white">{fileName}</p>
                <p className="text-sm text-gray-400">Click to upload a different file</p>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <Upload className="w-16 h-16 text-gray-500 group-hover:text-neon-blue transition-colors duration-300" />
                <Zap className="w-6 h-6 text-neon-purple absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-white">
                  Drag & drop your resume here
                </p>
                <p className="text-sm text-gray-400">
                  or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supports PDF and DOCX files
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadSection;

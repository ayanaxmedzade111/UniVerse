import React, { useState } from 'react';
import { Download, X, Terminal, Check, FolderArchive } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('npm install && npm run dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg p-6 rounded-2xl theme-surface space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close export modal"
          className="absolute top-4 right-4 p-1.5 rounded-lg theme-text-muted hover:text-black dark:hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <FolderArchive size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Export UniVerse Project</h3>
            <p className="text-xs theme-text-muted">
              Download and open in Visual Studio Code to develop or deploy.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs leading-relaxed">
          <p>
            UniVerse is structured as a clean, production-ready React + TypeScript + Vite project
            with modular CSS variables, 12 aesthetic themes, and an AI classification service.
          </p>

          <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border theme-border space-y-2">
            <span className="font-bold block text-xs">How to run in Visual Studio Code:</span>
            <ol className="list-decimal list-inside space-y-1 text-xs opacity-90">
              <li>Download the project folder or clone repository.</li>
              <li>Open the directory in VS Code: <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono">code universe</code></li>
              <li>Install dependencies and start development server:</li>
            </ol>
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 text-zinc-100 font-mono text-xs">
              <code>npm install && npm run dev</code>
              <button
                onClick={handleCopyCmd}
                className="p-1 rounded hover:bg-zinc-800 text-zinc-300"
                title="Copy terminal command"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Terminal size={14} />}
              </button>
            </div>
            <p className="text-[11px] theme-text-muted">Runs at http://localhost:3000</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t theme-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl theme-btn-primary shadow-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

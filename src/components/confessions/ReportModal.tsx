import React, { useState } from 'react';
import { addReport } from '../../services/storageService';
import { AlertTriangle, X, Check } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'confession' | 'comment' | 'message' | 'resource';
  targetId: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, targetType, targetId }) => {
  const [reason, setReason] = useState('Harassment or targeted bullying');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReport({
      id: `rep-${Date.now()}`,
      targetType,
      targetId,
      reason,
      details: details.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md p-6 rounded-2xl theme-surface space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close report modal"
          className="absolute top-4 right-4 p-1.5 rounded-lg theme-text-muted hover:text-black dark:hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 text-amber-500">
          <div className="p-2 rounded-xl bg-amber-500/10">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">Report Content</h3>
            <p className="text-xs theme-text-muted">Help maintain a safe and supportive student community.</p>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <Check size={20} />
            </div>
            <p className="text-sm font-semibold">Report Received</p>
            <p className="text-xs theme-text-muted">
              Thank you. Our moderation team reviews flagged submissions promptly according to community guidelines.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5">Reason for reporting</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl theme-input bg-transparent"
              >
                <option value="Harassment or targeted bullying">Harassment or targeted bullying</option>
                <option value="Doxxing or private personal info (phone/email/address)">
                  Doxxing or private personal info
                </option>
                <option value="Hate speech or discrimination">Hate speech or discrimination</option>
                <option value="Threat of harm or violence">Threat of harm or violence</option>
                <option value="Spam, advertising or scams">Spam or unwanted advertising</option>
                <option value="Academic dishonesty or exam fraud">Academic dishonesty</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5">Additional details (optional)</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Describe why this post violates community guidelines..."
                className="w-full p-2.5 text-xs rounded-xl theme-input bg-transparent resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-xl border theme-border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-xs"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

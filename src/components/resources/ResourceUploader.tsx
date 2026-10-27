import React, { useState } from 'react';
import { ResourceType } from '../../types';
import { addResource, getStoredUserProfile } from '../../services/storageService';
import { UploadCloud, Check, AlertCircle, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResourceUploaderProps {
  universityId: string;
  universitySlug: string;
  universityName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const RESOURCE_TYPES: ResourceType[] = [
  'Lecture Notes',
  'Study Guide',
  'Exam Prep',
  'Course Advice',
  'Study Schedule',
  'Project Material',
  'Survival Tip',
];

export const ResourceUploader: React.FC<ResourceUploaderProps> = ({
  universityId,
  universitySlug,
  universityName,
  onSuccess,
  onCancel,
}) => {
  const profile = getStoredUserProfile();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseSubject, setCourseSubject] = useState('');
  const [department, setDepartment] = useState(profile.department || '');
  const [academicYear, setAcademicYear] = useState(profile.academicYear || 'Year 2');
  const [resourceType, setResourceType] = useState<ResourceType>('Study Guide');
  const [tagsInput, setTagsInput] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileSize, setSelectedFileSize] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 10MB limit check
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('File size exceeds the 10MB limit. Please choose a smaller document.');
        return;
      }
      setSelectedFileName(file.name);
      setSelectedFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setErrorMsg('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !courseSubject.trim() || !description.trim()) {
      setErrorMsg('Please fill in title, course subject, and description.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const rawTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const tags = rawTags.length > 0 ? rawTags : [courseSubject.split(' ')[0], resourceType];

    addResource({
      id: `res-${Date.now()}`,
      universityId,
      universitySlug,
      universityName,
      title: title.trim(),
      description: description.trim(),
      courseSubject: courseSubject.trim(),
      department: department.trim() || undefined,
      academicYear: academicYear.trim() || undefined,
      resourceType,
      tags,
      fileName: selectedFileName || `${courseSubject.replace(/\s+/g, '_').toLowerCase()}_notes.pdf`,
      fileSize: selectedFileSize || '1.5 MB',
      helpfulVotes: 1,
      saved: false,
      authorNickname: isAnonymous ? 'Anonymous' : (profile.nickname || 'Student'),
      isAnonymous,
      createdAt: new Date().toISOString(),
    });

    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }

    setIsSubmitting(false);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="p-6 rounded-2xl theme-surface space-y-6 max-w-2xl mx-auto shadow-sm">
      <div className="border-b pb-4 theme-border">
        <h2 className="text-xl font-bold tracking-tight">Share Academic Resource</h2>
        <p className="text-xs theme-text-muted mt-0.5">
          Help your peers at <strong>{universityName}</strong> succeed in midterms, finals, and projects.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="text-xs font-semibold block mb-1">Resource Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Data Structures Midterm Cheat Sheet & Solved Trees"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl theme-input bg-transparent"
          />
        </div>

        {/* Course & Resource Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold block mb-1">Course / Subject Code *</label>
            <input
              type="text"
              required
              value={courseSubject}
              onChange={(e) => setCourseSubject(e.target.value)}
              placeholder="e.g. CS201, Calculus II, Macroeconomics"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl theme-input bg-transparent"
            />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1">Resource Category *</label>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value as ResourceType)}
              className="w-full p-2.5 text-xs rounded-xl theme-input bg-transparent"
            >
              {RESOURCE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Department & Academic Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold block mb-1">Department / Faculty (Optional)</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. School of IT & Engineering"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl theme-input bg-transparent"
            />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1">Recommended Year / Semester</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder="e.g. Year 2, Fall Semester"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl theme-input bg-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold block mb-1">Overview & Key Topics Covered *</label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Summarize the concepts, formulas, lecture weeks, or test tips included in these notes..."
            className="w-full p-3 text-xs rounded-xl theme-input bg-transparent resize-y"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-xs font-semibold block mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. Algorithms, Big-O, Exam Prep, Midterm"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl theme-input bg-transparent"
          />
        </div>

        {/* File Upload Attachment Box */}
        <div>
          <label className="text-xs font-semibold block mb-1.5">Document Attachment (PDF, Docx, Notes)</label>
          <label className="border-2 border-dashed theme-border rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <UploadCloud size={28} className="text-primary mb-2" />
            <span className="text-xs font-bold block">
              {selectedFileName ? selectedFileName : 'Click to choose notes or drag file here'}
            </span>
            <span className="text-[11px] theme-text-muted mt-0.5">
              {selectedFileSize ? `Selected: ${selectedFileSize}` : 'Supported: PDF, DOCX, TXT (Max 10MB)'}
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.zip"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Contributor Privacy */}
        <div className="pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary"
            />
            <span>Contribute anonymously without linking to my profile</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t theme-border">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-medium rounded-xl border theme-border"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !courseSubject.trim()}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl theme-btn-primary shadow-xs disabled:opacity-50"
          >
            <Check size={14} />
            {isSubmitting ? 'Publishing...' : 'Share Notes'}
          </button>
        </div>
      </form>
    </div>
  );
};

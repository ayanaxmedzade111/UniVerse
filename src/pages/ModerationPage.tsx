import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import {
  getStoredReports,
  updateReportStatus,
  ReportRecord,
  getStoredConfessions,
} from '../services/storageService';
import { updateConfessionModeration } from '../services/confessionService';
import { ShieldCheck, AlertTriangle, Check, X, ShieldAlert, Eye } from 'lucide-react';

export const ModerationPage: React.FC = () => {
  const [reports, setReports] = useState<ReportRecord[]>(() => getStoredReports());
  const allConfessions = getStoredConfessions();
  const [filter, setFilter] = useState<'Pending' | 'All'>('Pending');

  const filteredReports = reports.filter((r) =>
    filter === 'All' ? true : r.status === 'Pending'
  );

  const handleAction = (reportId: string, action: 'Dismiss' | 'Reject') => {
    const report = reports.find((r) => r.id === reportId);
    if (!report) return;

    if (action === 'Reject') {
      // Remove or flag confession
      if (report.targetType === 'confession') {
        updateConfessionModeration(report.targetId, 'Rejected');
      }
      updateReportStatus(reportId, 'Reviewed');
    } else {
      updateReportStatus(reportId, 'Dismissed');
    }

    setReports(getStoredReports());
  };

  return (
    <PageLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 theme-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 flex items-center gap-1">
                <ShieldAlert size={12} />
                Staff Moderation Desk
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Community Safety & Flagged Reports
            </h1>
            <p className="text-xs theme-text-muted mt-0.5">
              Review user-flagged confessions, comments, and messages to maintain a safe campus space.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/5 border theme-border">
            <button
              onClick={() => setFilter('Pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filter === 'Pending'
                  ? 'theme-btn-primary shadow-xs'
                  : 'theme-text-muted hover:text-black dark:hover:text-white'
              }`}
            >
              Pending ({reports.filter((r) => r.status === 'Pending').length})
            </button>
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filter === 'All'
                  ? 'theme-btn-primary shadow-xs'
                  : 'theme-text-muted hover:text-black dark:hover:text-white'
              }`}
            >
              All Reports ({reports.length})
            </button>
          </div>
        </div>

        {/* Reports Queue */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="p-12 rounded-3xl theme-surface border theme-border text-center space-y-3">
              <ShieldCheck size={36} className="mx-auto text-emerald-500" />
              <h3 className="font-bold text-base">All clear! No pending moderation flags.</h3>
              <p className="text-xs theme-text-muted max-w-sm mx-auto">
                All reported content has been reviewed. Community guidelines are being upheld.
              </p>
            </div>
          ) : (
            filteredReports.map((report) => {
              const matchedConfession =
                report.targetType === 'confession'
                  ? allConfessions.find((c) => c.id === report.targetId)
                  : null;

              return (
                <div
                  key={report.id}
                  className="p-5 rounded-2xl theme-surface border theme-border space-y-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-red-500/10 text-red-500">
                        <AlertTriangle size={16} />
                      </span>
                      <div>
                        <span className="text-xs font-bold block">{report.reason}</span>
                        <span className="text-[11px] theme-text-muted">
                          Report ID: {report.id} • Target: {report.targetType} ({report.targetId})
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        report.status === 'Pending'
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                          : 'bg-black/10 dark:bg-white/10 theme-text-muted'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>

                  {/* Target item context */}
                  {matchedConfession && (
                    <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border theme-border text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] theme-text-muted">
                        <span>Original post ({matchedConfession.universityName}):</span>
                        <span className="font-semibold text-primary">{matchedConfession.category}</span>
                      </div>
                      {matchedConfession.title && (
                        <p className="font-bold">{matchedConfession.title}</p>
                      )}
                      <p className="opacity-90">{matchedConfession.content}</p>
                    </div>
                  )}

                  {report.details && (
                    <p className="text-xs italic theme-text-muted pl-2 border-l-2 theme-border">
                      Reporter note: "{report.details}"
                    </p>
                  )}

                  {report.status === 'Pending' && (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t theme-border">
                      <button
                        onClick={() => handleAction(report.id, 'Dismiss')}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium border theme-border hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        <X size={13} />
                        Dismiss (Keep Post)
                      </button>
                      <button
                        onClick={() => handleAction(report.id, 'Reject')}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs"
                      >
                        <Check size={13} />
                        Take Down Content
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </PageLayout>
  );
};

import React, { useState } from 'react';
import { Shield, AlertTriangle, Flag, CheckCircle, XCircle } from 'lucide-react';

interface Report {
  id: string;
  postId: string;
  reporterId: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  timestamp: Date;
}

interface ContentModerationProps {
  reports: Report[];
  onReviewReport: (reportId: string, action: 'approve' | 'reject') => void;
}

export function ContentModeration({ reports, onReviewReport }: ContentModerationProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('pending');

  const filteredReports = reports.filter(report => {
    if (filter === 'pending') return report.status === 'pending';
    if (filter === 'resolved') return report.status === 'resolved';
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Shield className="w-6 h-6 mr-2 text-red-500" />
          Content Moderation
        </h2>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border rounded px-3 py-1"
          >
            <option value="all">All Reports</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className={`p-4 rounded-lg border ${
              report.status === 'pending'
                ? 'border-yellow-200 bg-yellow-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Flag className="w-4 h-4 text-red-500" />
                  <span className="font-medium">Report #{report.id}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    report.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-green-200 text-green-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{report.reason}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Reported: {report.timestamp.toLocaleString()}
                </p>
              </div>

              {report.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => onReviewReport(report.id, 'approve')}
                    className="p-2 text-green-600 hover:bg-green-100 rounded"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onReviewReport(report.id, 'reject')}
                    className="p-2 text-red-600 hover:bg-red-100 rounded"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

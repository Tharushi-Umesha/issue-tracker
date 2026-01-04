import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IssueList from '../components/issues/IssueList';
import Button from '../components/common/Button';
import { exportToCSV, exportToJSON } from '../utils/helpers';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  severity: string;
  creator_name?: string;
  created_at: string;
}

const IssuesPage: React.FC = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<Issue[]>([]);

  const handleExportCSV = () => {
    if (issues.length === 0) {
      alert('No issues to export. Please wait for issues to load.');
      return;
    }
    exportToCSV(issues, 'issues_export.csv');
  };

  const handleExportJSON = () => {
    if (issues.length === 0) {
      alert('No issues to export. Please wait for issues to load.');
      return;
    }
    exportToJSON(issues, 'issues_export.json');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Issues</h1>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="small"
            onClick={handleExportCSV}
            disabled={issues.length === 0}
          >
            Export CSV
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={handleExportJSON}
            disabled={issues.length === 0}
          >
            Export JSON
          </Button>
          <Button onClick={() => navigate('/issues/new')}>
            Create Issue
          </Button>
        </div>
      </div>

      <IssueList onIssuesChange={setIssues} />
    </div>
  );
};

export default IssuesPage;
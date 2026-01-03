import React from 'react';
import { useNavigate } from 'react-router-dom';
import IssueList from '../components/issues/IssueList';
import Button from '../components/common/Button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { exportToCSV, exportToJSON } from '../utils/helpers';

const IssuesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleExportCSV = () => {
    // This will be implemented with actual issue data
    console.log('Export to CSV');
  };

  const handleExportJSON = () => {
    // This will be implemented with actual issue data
    console.log('Export to JSON');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Issues</h1>
        <div className="flex gap-3">
          <Button variant="secondary" size="small" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="secondary" size="small" onClick={handleExportJSON}>
            Export JSON
          </Button>
          <Button onClick={() => navigate('/issues/new')}>
            Create Issue
          </Button>
        </div>
      </div>

      <IssueList />
    </div>
  );
};

export default IssuesPage;
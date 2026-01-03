import React from 'react';
import Card  from '../components/common/Card';
import IssueForm from '../components/issues/IssueForm';

const CreateIssuePage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Create New Issue</h1>

            <Card>
                <IssueForm />
            </Card>
        </div>
    );
};

export default CreateIssuePage;
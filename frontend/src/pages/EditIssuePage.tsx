import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import IssueForm from '../components/issues/IssueForm';
import Loader from '../components/common/Loader';
import Alert from '../components/common/Alert';
import { issuesAPI } from '../services/api';
import { getErrorMessage } from '../utils/helpers';

const EditIssuePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchIssue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchIssue = async () => {
        try {
            const response = await issuesAPI.getById(Number(id));
            setIssue(response.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader size="large" text="Loading issue..." />
            </div>
        );
    }

    if (error) {
        return <Alert type="error" message={error} />;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Issue</h1>

            <Card>
                <IssueForm issueId={Number(id)} initialData={issue} />
            </Card>
        </div>
    );
};

export default EditIssuePage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { issuesAPI } from '../../services/api';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Loader from '../common/Loader';
import Alert from '../common/Alert';
import { ConfirmModal } from '../common/ConfirmModal';
import { formatDateTime, getErrorMessage } from '../../utils/helpers';

interface Issue {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    severity: string;
    creator_name?: string;
    creator_email?: string;
    created_at: string;
    updated_at: string;
}

const IssueDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [issue, setIssue] = useState<Issue | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

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

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await issuesAPI.delete(Number(id));
            navigate('/issues');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(getErrorMessage(err));
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader size="large" text="Loading issue..." />
            </div>
        );
    }

    if (error && !issue) {
        return <Alert type="error" message={error} />;
    }

    if (!issue) {
        return <Alert type="error" message="Issue not found" />;
    }

    return (
        <div className="space-y-6">
            {error && <Alert type="error" message={error} onClose={() => setError('')} />}

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{issue.title}</h1>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => navigate(`/issues/${id}/edit`)}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                        Delete
                    </Button>
                </div>
            </div>

            <Card>
                <div className="space-y-6">
                    <div className="flex gap-3">
                        <Badge variant={issue.status}>{issue.status}</Badge>
                        <Badge variant={issue.priority}>{issue.priority}</Badge>
                        <Badge variant={issue.severity}>{issue.severity}</Badge>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{issue.description}</p>
                    </div>

                    <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600">Created by:</span>
                            <p className="font-medium">{issue.creator_name || 'Unknown'}</p>
                            <p className="text-gray-500">{issue.creator_email}</p>
                        </div>

                        <div>
                            <span className="text-gray-600">Created at:</span>
                            <p className="font-medium">{formatDateTime(issue.created_at)}</p>
                            <span className="text-gray-600">Updated at:</span>
                            <p className="font-medium">{formatDateTime(issue.updated_at)}</p>
                        </div>
                    </div>
                </div>
            </Card>

            <Button variant="secondary" onClick={() => navigate('/issues')}>
                Back to Issues
            </Button>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Issue"
                message="Are you sure you want to delete this issue? This action cannot be undone."
                confirmText={deleting ? 'Deleting...' : 'Delete'}
                type="danger"
            />
        </div>
    );
};

export default IssueDetails;
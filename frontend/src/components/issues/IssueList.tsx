import React, { useState, useEffect } from 'react';
import { issuesAPI } from '../../services/api';
import IssueCard from './IssueCard';
import IssueFilters from './IssueFilters';
import Button from '../common/Button';
import Loader from '../common/Loader';
import Alert from '../common/Alert';
import { getErrorMessage, debounce } from '../../utils/helpers';

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

interface IssueListProps {
    onIssuesChange?: (issues: Issue[]) => void;
}

const IssueList: React.FC<IssueListProps> = ({ onIssuesChange }) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        search: '',
        page: 1,
        limit: 10
    });
    const [totalPages, setTotalPages] = useState(1);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            const response = await issuesAPI.getAll(filters);
            setIssues(response.data.issues);
            setTotalPages(response.data.totalPages);


            if (onIssuesChange) {
                onIssuesChange(response.data.issues);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.status, filters.priority, filters.page]);


    useEffect(() => {
        const debouncedSearch = debounce(() => {
            fetchIssues();
        }, 500);

        if (filters.search !== '') {
            debouncedSearch();
        } else {
            fetchIssues();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.search]);

    const handleFilterChange = (name: string, value: string) => {
        setFilters({ ...filters, [name]: value, page: 1 });
    };

    const handlePageChange = (newPage: number) => {
        setFilters({ ...filters, page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading && issues.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader size="large" text="Loading issues..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {error && <Alert type="error" message={error} onClose={() => setError('')} />}

            <IssueFilters filters={filters} onFilterChange={handleFilterChange} />

            {issues.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No issues found</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {issues.map((issue) => (
                            <IssueCard key={issue.id} issue={issue} />
                        ))}
                    </div>


                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2">
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => handlePageChange(filters.page - 1)}
                                disabled={filters.page === 1}
                            >
                                Previous
                            </Button>

                            <span className="text-sm text-gray-600">
                                Page {filters.page} of {totalPages}
                            </span>

                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => handlePageChange(filters.page + 1)}
                                disabled={filters.page === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default IssueList;
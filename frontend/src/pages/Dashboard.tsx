import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { issuesAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Alert from '../components/common/Alert';
import { getErrorMessage } from '../utils/helpers';

interface IssueStats {
    Open: number;
    'In Progress': number;
    Resolved: number;
    Closed: number;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<IssueStats>({
        Open: 0,
        'In Progress': 0,
        Resolved: 0,
        Closed: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await issuesAPI.getStats();
            setStats(response.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: 'Open', count: stats.Open, color: 'bg-blue-500', icon: '📋' },
        { title: 'In Progress', count: stats['In Progress'], color: 'bg-yellow-500', icon: '⚙️' },
        { title: 'Resolved', count: stats.Resolved, color: 'bg-green-500', icon: '✅' },
        { title: 'Closed', count: stats.Closed, color: 'bg-gray-500', icon: '🔒' }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader size="large" text="Loading dashboard..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <Button onClick={() => navigate('/issues/new')}>
                    Create New Issue
                </Button>
            </div>

            {error && <Alert type="error" message={error} onClose={() => setError('')} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Card key={stat.title} padding="normal" hover>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                            </div>
                            <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" fullWidth onClick={() => navigate('/issues')}>
                            View All Issues
                        </Button>
                        <Button variant="outline" fullWidth onClick={() => navigate('/issues/new')}>
                            Create New Issue
                        </Button>
                        <Button variant="outline" fullWidth onClick={() => navigate('/issues?status=Open')}>
                            View Open Issues
                        </Button>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">Issue Statistics</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Issues:</span>
                            <span className="font-semibold">
                                {stats.Open + stats['In Progress'] + stats.Resolved + stats.Closed}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Active Issues:</span>
                            <span className="font-semibold">{stats.Open + stats['In Progress']}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Completion Rate:</span>
                            <span className="font-semibold">
                                {stats.Open + stats['In Progress'] + stats.Resolved + stats.Closed > 0
                                    ? Math.round(
                                        ((stats.Resolved + stats.Closed) /
                                            (stats.Open + stats['In Progress'] + stats.Resolved + stats.Closed)) *
                                        100
                                    )
                                    : 0}
                                %
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
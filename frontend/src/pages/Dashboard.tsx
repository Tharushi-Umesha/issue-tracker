import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { issuesAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Alert from '../components/common/Alert';
import { getErrorMessage } from '../utils/helpers';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/img3.png';
import image4 from '../assets/images/img4.png';
import image5 from '../assets/images/img5.png';
import image6 from '../assets/images/img6.png';
import image7 from '../assets/images/img7.png';
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
        {
            title: 'Open',
            count: stats.Open,
            color: 'bg-blue-500',
            textColor: 'text-blue-600',
            bgLight: 'bg-blue-50',
            icon: image7,
            description: 'Newly reported issues'
        },
        {
            title: 'In Progress',
            count: stats['In Progress'],
            color: 'bg-yellow-500',
            textColor: 'text-yellow-600',
            bgLight: 'bg-yellow-50',
            icon: image4,
            description: 'Currently being worked on'
        },
        {
            title: 'Resolved',
            count: stats.Resolved,
            color: 'bg-green-500',
            textColor: 'text-green-600',
            bgLight: 'bg-green-50',
            icon: image5,
            description: 'Successfully fixed'
        },
        {
            title: 'Closed',
            count: stats.Closed,
            color: 'bg-gray-500',
            textColor: 'text-gray-600',
            bgLight: 'bg-gray-50',
            icon: image6,
            description: 'Completed and archived'
        }
    ];

    const totalIssues = stats.Open + stats['In Progress'] + stats.Resolved + stats.Closed;
    const activeIssues = stats.Open + stats['In Progress'];
    const completedIssues = stats.Resolved + stats.Closed;
    const completionRate = totalIssues > 0 ? Math.round((completedIssues / totalIssues) * 100) : 0;

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
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Overview of your issue tracking system</p>
                </div>
                <Button onClick={() => navigate('/issues/new')}>
                    + Create New Issue
                </Button>
            </div>

            {error && <Alert type="error" message={error} onClose={() => setError('')} />}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Card
                        key={stat.title}
                        padding="normal"
                        hover
                        onClick={() => navigate(`/issues?status=${stat.title}`)}
                        className="cursor-pointer"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center p-2`}>
                                    <img
                                        src={stat.icon}
                                        alt={stat.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className={`text-4xl font-bold ${stat.textColor}`}>
                                    {stat.count}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">{stat.title}</h3>
                                <p className="text-sm text-gray-500">{stat.description}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <Card padding="normal">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center p-3">
                            <img src={image1} alt="Total" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Total Issues</p>
                        <p className="text-4xl font-bold text-gray-900">{totalIssues}</p>
                        <p className="text-xs text-gray-500">All issues tracked</p>
                    </div>
                </Card>


                <Card padding="normal">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center p-3">
                            <img src={image2} alt="Active" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Active Issues</p>
                        <p className="text-4xl font-bold text-orange-600">{activeIssues}</p>
                        <p className="text-xs text-gray-500">Open + In Progress</p>
                    </div>
                </Card>


                <Card padding="normal">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center p-3">
                            <img src={image3} alt="Completion" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Completion Rate</p>
                        <p className="text-4xl font-bold text-green-600">{completionRate}%</p>
                        <p className="text-xs text-gray-500">{completedIssues} of {totalIssues} completed</p>
                    </div>
                </Card>
            </div>


            <Card padding="normal">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">Issue Progress</h2>
                        <span className="text-sm text-gray-600">{completedIssues}/{totalIssues} Completed</span>
                    </div>


                    <div className="relative">
                        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full flex">
                                {totalIssues > 0 && (
                                    <>
                                        <div
                                            className="bg-blue-500 flex items-center justify-center text-white text-xs font-medium"
                                            style={{ width: `${(stats.Open / totalIssues) * 100}%` }}
                                        >
                                            {stats.Open > 0 && stats.Open}
                                        </div>
                                        <div
                                            className="bg-yellow-500 flex items-center justify-center text-white text-xs font-medium"
                                            style={{ width: `${(stats['In Progress'] / totalIssues) * 100}%` }}
                                        >
                                            {stats['In Progress'] > 0 && stats['In Progress']}
                                        </div>
                                        <div
                                            className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                                            style={{ width: `${(stats.Resolved / totalIssues) * 100}%` }}
                                        >
                                            {stats.Resolved > 0 && stats.Resolved}
                                        </div>
                                        <div
                                            className="bg-gray-500 flex items-center justify-center text-white text-xs font-medium"
                                            style={{ width: `${(stats.Closed / totalIssues) * 100}%` }}
                                        >
                                            {stats.Closed > 0 && stats.Closed}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-gray-700">Open ({stats.Open})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                            <span className="text-gray-700">In Progress ({stats['In Progress']})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-gray-700">Resolved ({stats.Resolved})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-500 rounded"></div>
                            <span className="text-gray-700">Closed ({stats.Closed})</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
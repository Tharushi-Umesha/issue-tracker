import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatRelativeTime, truncateText } from '../../utils/helpers';

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

interface IssueCardProps {
    issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
    const navigate = useNavigate();

    return (
        <Card hover padding="normal" className="cursor-pointer" onClick={() => navigate(`/issues/${issue.id}`)}>
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                    <Badge variant={issue.status}>{issue.status}</Badge>
                </div>

                <p className="text-gray-600 text-sm">{truncateText(issue.description, 120)}</p>

                <div className="flex gap-2">
                    <Badge variant={issue.priority} size="small">
                        {issue.priority}
                    </Badge>
                    <Badge variant={issue.severity} size="small">
                        {issue.severity}
                    </Badge>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
                    <span>By {issue.creator_name || 'Unknown'}</span>
                    <span>{formatRelativeTime(issue.created_at)}</span>
                </div>
            </div>
        </Card>
    );
};

export default IssueCard;
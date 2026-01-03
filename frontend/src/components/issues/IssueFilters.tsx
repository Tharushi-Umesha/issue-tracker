import React from 'react';
import Select from '../common/Select';
import { SearchInput } from '../common/SearchInput';

interface IssueFiltersProps {
    filters: {
        status: string;
        priority: string;
        search: string;
    };
    onFilterChange: (name: string, value: string) => void;
}

const IssueFilters: React.FC<IssueFiltersProps> = ({ filters, onFilterChange }) => {
    const statusOptions = [
        { value: '', label: 'All Statuses' },
        { value: 'Open', label: 'Open' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Resolved', label: 'Resolved' },
        { value: 'Closed', label: 'Closed' }
    ];

    const priorityOptions = [
        { value: '', label: 'All Priorities' },
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
        { value: 'Critical', label: 'Critical' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SearchInput
                value={filters.search}
                onChange={(e) => onFilterChange('search', e.target.value)}
                placeholder="Search issues..."
            />

            <Select
                name="status"
                value={filters.status}
                onChange={(e: { target: { value: string; }; }) => onFilterChange('status', e.target.value)}
                options={statusOptions}
                placeholder="Filter by status"
            />

            <Select
                name="priority"
                value={filters.priority}
                onChange={(e: { target: { value: string; }; }) => onFilterChange('priority', e.target.value)}
                options={priorityOptions}
                placeholder="Filter by priority"
            />
        </div>
    );
};

export default IssueFilters;
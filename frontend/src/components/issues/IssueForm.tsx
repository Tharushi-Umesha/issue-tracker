import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { issuesAPI } from '../../services/api';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Loader from '../common/Loader';
import { getErrorMessage } from '../../utils/helpers';

interface IssueFormProps {
    issueId?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
}

const IssueForm: React.FC<IssueFormProps> = ({ issueId, initialData }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Open',
        priority: 'Medium',
        severity: 'Major'
    });
    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                status: initialData.status || 'Open',
                priority: initialData.priority || 'Medium',
                severity: initialData.severity || 'Major'
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = (): boolean => {
        const newErrors = { title: '', description: '' };
        let isValid = true;

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setError('');

        try {
            if (issueId) {
                await issuesAPI.update(issueId, formData);
                setSuccess('Issue updated successfully!');
                setTimeout(() => navigate(`/issues/${issueId}`), 1500);
            } else {
                const response = await issuesAPI.create(formData);
                setSuccess('Issue created successfully!');
                setTimeout(() => navigate(`/issues/${response.data.id}`), 1500);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const statusOptions = [
        { value: 'Open', label: 'Open' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Resolved', label: 'Resolved' },
        { value: 'Closed', label: 'Closed' }
    ];

    const priorityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
        { value: 'Critical', label: 'Critical' }
    ];

    const severityOptions = [
        { value: 'Minor', label: 'Minor' },
        { value: 'Major', label: 'Major' },
        { value: 'Critical', label: 'Critical' }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <Alert type="error" message={error} onClose={() => setError('')} />}
            {success && <Alert type="success" message={success} />}

            <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter issue title"
                error={errors.title}
                required
            />

            <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail"
                rows={6}
                error={errors.description}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={statusOptions}
                    required
                />

                <Select
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    options={priorityOptions}
                    required
                />

                <Select
                    label="Severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    options={severityOptions}
                    required
                />
            </div>

            <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                    {loading ? <Loader size="small" /> : issueId ? 'Update Issue' : 'Create Issue'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default IssueForm;
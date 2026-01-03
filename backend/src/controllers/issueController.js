const { validationResult } = require('express-validator');
const Issue = require('../models/Issue');


const getIssues = async (req, res) => {
    try {
        const { page, limit, status, priority, search } = req.query;

        const filters = {
            page: page || 1,
            limit: limit || 10,
            status,
            priority,
            search
        };

        const result = await Issue.findAll(filters);
        res.json(result);
    } catch (error) {
        console.error('Get issues error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getIssue = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.json(issue);
    } catch (error) {
        console.error('Get issue error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const createIssue = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, status, priority, severity } = req.body;

        const issueData = {
            title,
            description,
            status,
            priority,
            severity,
            created_by: req.user.id
        };

        const issueId = await Issue.create(issueData);
        const issue = await Issue.findById(issueId);

        res.status(201).json(issue);
    } catch (error) {
        console.error('Create issue error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const updateIssue = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        const { title, description, status, priority, severity } = req.body;

        const issueData = {
            title: title || issue.title,
            description: description || issue.description,
            status: status || issue.status,
            priority: priority || issue.priority,
            severity: severity || issue.severity
        };

        await Issue.update(req.params.id, issueData);
        const updatedIssue = await Issue.findById(req.params.id);

        res.json(updatedIssue);
    } catch (error) {
        console.error('Update issue error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const deleteIssue = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        await Issue.delete(req.params.id);
        res.json({ message: 'Issue deleted successfully' });
    } catch (error) {
        console.error('Delete issue error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getIssueStats = async (req, res) => {
    try {
        const counts = await Issue.getStatusCounts();
        res.json(counts);
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getIssues,
    getIssue,
    createIssue,
    updateIssue,
    deleteIssue,
    getIssueStats
};
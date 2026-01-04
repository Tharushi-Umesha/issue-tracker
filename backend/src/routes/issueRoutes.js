const express = require('express');
const { body } = require('express-validator');
const {
    getIssues,
    getIssue,
    createIssue,
    updateIssue,
    deleteIssue,
    getIssueStats
} = require('../controllers/issueController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const issueValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('status').optional().isIn(['Open', 'In Progress', 'Resolved', 'Closed']).withMessage('Invalid status'),
    body('priority').optional().isIn(['Low', 'Medium', 'High', 'Critical']).withMessage('Invalid priority'),
    body('severity').optional().isIn(['Minor', 'Major', 'Critical']).withMessage('Invalid severity')
];

router.use(protect);

router.get('/stats', getIssueStats);
router.get('/', getIssues);
router.get('/:id', getIssue);
router.post('/', issueValidation, createIssue);
router.put('/:id', issueValidation, updateIssue);
router.delete('/:id', deleteIssue);

module.exports = router;
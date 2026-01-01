const { pool } = require('../config/db');

class Issue {

  static async create(issueData) {
    const { title, description, status, priority, severity, created_by } = issueData;
    
    const [result] = await pool.query(
      `INSERT INTO issues (title, description, status, priority, severity, created_by) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, status || 'Open', priority || 'Medium', severity || 'Major', created_by]
    );
    
    return result.insertId;
  }


  static async findAll(filters = {}) {
    const { page = 1, limit = 10, status, priority, search, created_by } = filters;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT i.*, u.name as creator_name 
      FROM issues i 
      LEFT JOIN users u ON i.created_by = u.id 
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND i.status = ?';
      params.push(status);
    }

    if (priority) {
      query += ' AND i.priority = ?';
      params.push(priority);
    }

    if (search) {
      query += ' AND (i.title LIKE ? OR i.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (created_by) {
      query += ' AND i.created_by = ?';
      params.push(created_by);
    }

    query += ' ORDER BY i.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);
    

    let countQuery = 'SELECT COUNT(*) as total FROM issues WHERE 1=1';
    const countParams = [];
    
    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }
    if (priority) {
      countQuery += ' AND priority = ?';
      countParams.push(priority);
    }
    if (search) {
      countQuery += ' AND (title LIKE ? OR description LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }
    if (created_by) {
      countQuery += ' AND created_by = ?';
      countParams.push(created_by);
    }

    const [countResult] = await pool.query(countQuery, countParams);
    
    return {
      issues: rows,
      total: countResult[0].total,
      page: parseInt(page),
      totalPages: Math.ceil(countResult[0].total / limit)
    };
  }


  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT i.*, u.name as creator_name, u.email as creator_email 
       FROM issues i 
       LEFT JOIN users u ON i.created_by = u.id 
       WHERE i.id = ?`,
      [id]
    );
    return rows[0];
  }


  static async update(id, issueData) {
    const { title, description, status, priority, severity } = issueData;
    
    const [result] = await pool.query(
      `UPDATE issues 
       SET title = ?, description = ?, status = ?, priority = ?, severity = ?
       WHERE id = ?`,
      [title, description, status, priority, severity, id]
    );
    
    return result.affectedRows;
  }


  static async delete(id) {
    const [result] = await pool.query('DELETE FROM issues WHERE id = ?', [id]);
    return result.affectedRows;
  }


  static async getStatusCounts(created_by = null) {
    let query = `
      SELECT 
        status,
        COUNT(*) as count
      FROM issues
    `;
    const params = [];

    if (created_by) {
      query += ' WHERE created_by = ?';
      params.push(created_by);
    }

    query += ' GROUP BY status';

    const [rows] = await pool.query(query, params);
    
    const counts = {
      Open: 0,
      'In Progress': 0,
      Resolved: 0,
      Closed: 0
    };

    rows.forEach(row => {
      counts[row.status] = row.count;
    });

    return counts;
  }
}

module.exports = Issue;
const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {

    static async create(userData) {
        const { name, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        return result.insertId;
    }


    static async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }


    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT id, name, email, created_at FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }


    static async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;
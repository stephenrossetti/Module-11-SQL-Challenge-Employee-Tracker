const connection = require('../config/connection');
const inquirer = require('inquirer');
const { roleQuestions } = require('./questions');

const viewRoles = async () => {
    try {
        const request = "SELECT * FROM roles";
        const results = await connection.query(request)
        console.log('All roles');
        console.table(results);
    } catch (err) {
        console.log('Error getting roles', err);
    }
};

const newRole = async () => {
    try {
        const answer = await inquirer.prompt(roleQuestions);
        const results = await connection.query('INSERT INTO roles(role_name, role_salary, role_id) VALUES (?,?,?)',
            [answer.roleName, answer.roleSalary, answer.roleID]);
        console.log('New role added');
        console.table(results);
    } catch (err) {
        console.error('Error adding new role', err);
    }
};

module.exports = { viewRoles, newRole }
const connection = require('../config/connection');
const inquirer = require('inquirer');
const { employeeQuestions } = require('./questions');

const viewEmployees = async () => {
    try {
        const request = "SELECT * FROM employees";
        const results = await connection.query(request);
        console.log('All employees');
        console.table(results);
        return results;
    } catch (err) {
        console.log('Error getting employees', err);
    }
};

const newEmployee = async () => {
    try {
        const answer = await inquirer.prompt(employeeQuestions);
        const results = await connection.query('INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)',
            [answer.firstName, answer.lastName, answer.employeeID, answer.managerID]);
        console.log('New employee added');
        console.table(results);
    } catch (err) {
        console.error('Error adding new employee', err);
    }
};

module.exports = { viewEmployees, newEmployee }
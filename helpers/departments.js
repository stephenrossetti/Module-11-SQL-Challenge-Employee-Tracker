const connection = require('../config/connection');
const inquirer = require('inquirer');
const { departmentQuestions } = require('./questions');

const viewDepartments = async () => {
    try {
        const request = "SELECT * FROM departments";
        const results = await connection.query(request)
        console.log('All departments');
        console.table(results);
    } catch (err) {
        console.log('Error getting deparments', err);
    }
};

const newDepartment = async () => {
    try {
        const answer = await inquirer.prompt(departmentQuestions);
        const results = await connection.query('INSERT INTO departments(department_name, department_id) VALUES (?,?)',
            [answer.departmentName, answer.departmentID]);
        console.log('New department added');
        console.table(results);
    } catch (err) {
        console.error('Error adding new department', err);
    }
};

module.exports = { viewDepartments, newDepartment }
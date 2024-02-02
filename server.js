const inquirer = require('inquirer');
const mySQL = require('mysql2');
require('dotenv').config();
const { initialQuestions, endQuestions, employeeQuestions, roleQuestions, departmentQuestions, updateQuestions } = require('./helpers/questions');

const db = mySQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

let init = async () => {
    const answer = await inquirer.prompt(initialQuestions);
    switch (answer.choice) {
        case 'View Employees':
            db.query(`SELECT * FROM employees`, (err, result) => {
                if (err) throw err
                console.log('You are viewing all employees!')
                console.table(result)
                mainMenu();
            });
            break;
        case 'View Departments':
            db.query(`SELECT * FROM departments`, (err, result) => {
                if (err) throw err
                console.log('You are viewing all departments!')
                console.table(result)
                mainMenu();
            });
            break;
        case 'View Roles':
            db.query(`SELECT * FROM roles`, (err, result) => {
                if (err) throw err
                console.log('You are viewing all roles!')
                console.table(result)
                mainMenu();
            });
            break;
        case 'Add New Employee':
            const answerNE = await inquirer.prompt(employeeQuestions);
            db.query('INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)',
                [answerNE.firstName, answerNE.lastName, answerNE.roleID, answerNE.managerID], (err, result) => {
                    if (err) throw err
                    console.log('New employee added!')
                    console.table(result)
                    mainMenu();
                });
            break;
        case 'Add New Department':
            const answerND = await inquirer.prompt(departmentQuestions);
            db.query('INSERT INTO departments (department_name) VALUES (?)',
                [answerND.departmentName], (err, result) => {
                    if (err) throw err
                    console.log('New department added!')
                    console.table(result)
                    mainMenu();
                });
            break;
        case 'Add New Role':
            const answerNR = await inquirer.prompt(roleQuestions);
            db.query('INSERT INTO roles (role_name, role_salary, department_id) VALUES (?,?,?)',
                [answerNR.roleName, answerNR.roleSalary, answerNR.departmentID], (err, result) => {
                    if (err) throw err
                    console.log('New role added!')
                    console.table(result)
                    mainMenu();
                });
            break;
        case 'Update An Employees Role':
            const answerER = await inquirer.prompt(updateQuestions);
            db.query('UPDATE employees SET roles_id = ? WHERE id = ?',
                [answerER.updateRole, answerER.updateEmployee], (err, result) => {
                    if (err) throw err
                    console.log('Employee updated!')
                    console.table(result)
                    mainMenu();
                });
            break;
        case 'Exit':
            exit();
            break;
    }
}

const mainMenu = () => {
    inquirer.prompt(endQuestions)
        .then((answer) => {
            switch (answer.choice) {
                case 'Main Menu':
                    init();
                    break;
                case 'Quit':
                    exit();
            }
        })
};

const exit = () => {
    console.log('Exiting');
    process.exit();
}

init();

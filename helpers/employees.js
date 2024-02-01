const db = require('../config/connection');
const inquirer = require('inquirer');
const {endQuestions, employeeQuestions } = require('./questions');
const {init} = require('../server');


const viewEmployees = () => {
    const request = "SELECT * FROM employees";
    db.query(request, function (err, res) {
        if (err) {
            console.log('Error getting employees', err);
        return;
    }     
        console.log('All Employees');
        console.table(res);
        inquirer.prompt(endQuestions)
            .then((answer) => {
                switch (answer.choice) {
                    case 'Main Menu':
                        init();
                        break;
                    case 'Quit':
                        exit();
                }
            }
            )
    })
}

const newEmployee = () => {
    inquirer.prompt(employeeQuestions)
    .then(function(answer){
        db.query('INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)',
        [answer.firstName, answer.lastName, answer.employeeID, answer.managerID], function (err, answer) {
            if (err) {
                console.log('Error adding new employee', err);
            return;
        }
        console.table(answer);
        inquirer.prompt(endQuestions)
            .then((answer) => {
                switch (answer.choice) {
                    case 'Main Menu':
                        init();
                        break;
                    case 'Quit':
                        exit();
                }
            }
        )
    })
})
};



module.exports = { viewEmployees, newEmployee}
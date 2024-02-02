const inquirer = require('inquirer');
const express = require('express');
const { initialQuestions, endQuestions } = require('./helpers/questions');
const { viewEmployees, newEmployee } = require('./helpers/employees');
const { viewDepartments, newDepartment } = require('./helpers/departments');
const { viewRoles, newRole } = require('./helpers/roles');

let init = async () => {
    const answer = await inquirer.prompt(initialQuestions);
    switch (answer.choice) {
        case 'View Employees':
            await viewEmployees();
            await mainMenu();
            break;
        case 'View Departments':
            await viewDepartments();
            await mainMenu();
            break;
        case 'View Roles':
            await viewRoles();
            await mainMenu();
            break;
        case 'Add New Employee':
            await newEmployee();
            await mainMenu();
            break;
        case 'Add New Department':
            await newDepartment();
            await mainMenu();
            break;
        case 'Add New Role':
            await newRole();
            await mainMenu();
            break;
        case 'Exit':
            exit();
            break;
    }
}

let mainMenu = () => {
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

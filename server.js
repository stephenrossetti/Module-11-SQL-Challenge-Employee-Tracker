const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const { initialQuestions } = require('./helpers/questions');
const { viewEmployees, viewDepartments, viewRoles, newEmployee, newDepartment, newRole, exit } = require('./helpers/index');

let init = async () => {
    const answer = await inquirer.prompt(initialQuestions);
    switch (answer.choice) {
        case 'View Employees':
            await viewEmployees();
            init();
            break;
        case 'View Departments':
            await viewDepartments();
            break;
        case 'View Roles':
            await viewRoles();
            break;
        case 'Add New Employee':
            await newEmployee();
            break;
        case 'Add New Department':
            await newDepartment();
            break;
        case 'Add New Role':
            await newRole();
            break;
        case 'Exit':
            exit();
            break;
    }
}

module.exports = {init}
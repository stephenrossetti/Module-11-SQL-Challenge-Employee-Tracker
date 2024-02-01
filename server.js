const inquirer = require('inquirer');
const db = require('./config/connection');
const mysql = require('mysql2');
const express = require('express');
const questions = require('./helpers/questions');
const {viewEmployees, viewDepartments, viewRoles, newEmployee, newDepartment, newRole, exit} = require('./helpers/index');

let init = () => {
    inquirer.prompt(questions)
        .then((answer) => {
            switch (answer.choice) {
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'Add New Employee':
                    newEmployee();
                    break;
                case 'Add New Department':
                    newDepartment();
                    break;
                case 'Add New Role':
                    newRole();
                    break;
                case 'Exit':
                    exit();
                    break;
            }
        }
        )
}
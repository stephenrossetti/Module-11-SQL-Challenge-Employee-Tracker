const initialQuestions = [
    {
        type: 'list',
        name: 'choice',
        message: 'Select an option below:',
        choices: [
            'View Employees',
            'View Departments',
            'View Roles',
            'Add New Employee',
            'Add New Department',
            'Add New Role',
            'Exit'
        ]
    }
];

const endQuestions = [
    {
        type: 'list',
        name: 'choice',
        message: 'Select an option below:',
        choices: [
            'Main Menu',
            'Exit'
        ]
    }
];

const employeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter first name of new employee:',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter last name of new employee:',
    },
    {
        type: 'input',
        name: 'employeeID',
        message: 'Enter ID of new employee:',
    },
    {
        type: 'input',
        name: 'managerID',
        message: 'Enter ID of manager:',
    }
];

const roleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: 'Enter title of new role:',
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter salary of new role:',
    },
    {
        type: 'input',
        name: 'roleID',
        message: 'Enter ID of new role:',
    }
];

const departmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'Enter name of new department:',
    },
    {
        type: 'input',
        name: 'departmentID',
        message: 'Enter ID of new department:',
    }
];

module.exports = { initialQuestions, endQuestions, employeeQuestions, roleQuestions, departmentQuestions }
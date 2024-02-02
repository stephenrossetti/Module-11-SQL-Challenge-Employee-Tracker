const initialQuestions = [
    {
        type: 'list',
        name: 'choice',
        message: 'Select an option below:',
        choices: [
            'View Employees',
            'View Employees by Department',
            'View Employees by Manager',
            'View Departments',
            'View Roles',
            'Add New Employee',
            'Add New Department',
            'Add New Role',
            'Update An Employees Role',
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
        name: 'roleID',
        message: 'Enter ID of role:',
    },
    {
        type: 'input',
        name: 'managerID',
        message: 'Enter ID of manager:',
    }
];

const departmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'Enter name of new department:',
    }
];

const updateQuestions = [
    {
        type: 'input',
        name: 'updateEmployee',
        message: 'Enter ID employee:',
    },
    {
        type: 'input',
        name: 'updateRole',
        message: 'Enter new role ID:',
    }
];

module.exports = { initialQuestions, endQuestions, employeeQuestions, departmentQuestions, updateQuestions }
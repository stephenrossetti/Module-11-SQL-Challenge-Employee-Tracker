const initialQuestions = [
    {
        type: 'list',
        name: 'choice',
        message: 'Select an option below:',
        choices: [
            'View Employees',
            'View Employees by Department',
            'View Departments',
            'View Roles',
            'Add New Employee',
            'Add New Department',
            'Add New Role',
            'Update An Employees Role',
            'View Budget by Department',
            'Exit'
        ]
    }
];

module.exports = { initialQuestions }
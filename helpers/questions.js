// Created an array with command-line questions and utilizes that information for the sample SVG logo//
// Export array //
const questions = [
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

module.exports = questions
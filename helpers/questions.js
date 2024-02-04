//Created a questions "helper" js to export to server.js (clean up/shorten code in server.js)
//Originally had all questions here, but the more in-depth questions that used db.query() were erroring out
//Kept file for future improvements if prompts are ever stored here and exported

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
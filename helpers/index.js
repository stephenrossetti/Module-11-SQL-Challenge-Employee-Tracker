const { viewEmployees, newEmployee} = require('./employees');
const { viewDepartments, newDepartment } = require('./departments');
const { viewRoles, newRole } = require('./roles');

const exit = () => {
    console.log('Exiting');
    process.exit();
}

module.exports = { viewEmployees, viewDepartments, viewRoles, newEmployee, newDepartment, newRole, exit }
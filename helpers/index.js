const { viewEmployees, newEmployee} = require('./employees');
const { viewDepartments, newDepartment } = require('./departments');
const { viewRoles, newRole } = require('./roles');



module.exports = { viewEmployees, viewDepartments, viewRoles, newEmployee, newDepartment, newRole, exit }
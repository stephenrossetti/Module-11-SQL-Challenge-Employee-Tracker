const inquirer = require('inquirer');
const mySQL = require('mysql2');
require('dotenv').config();
const cfonts = require('cfonts');
const { initialQuestions } = require('./helpers/questions');

const db = mySQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

cfonts.say('NFL Company!', {
    font: 'block',              // define the font face
    align: 'left',              // define text alignment
    colors: ['system'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line
    gradient: false,            // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false,  // define if this is a transition between colors directly
    env: 'node'                 // define the environment cfonts is being executed in
});

let init = async () => {
    const answer = await inquirer.prompt(initialQuestions);
    switch (answer.choice) {
        case 'View Employees':
            viewEmployees();
            break;
        case 'View Employees by Department':
            viewEmployeeByDepartment();
            break;
        case 'View Departments':
            viewDepartments();
            break;
        case 'View Roles':
            viewRoles();
            break;
        case 'Add New Employee':
            addNewEmployee();
            break;
        case 'Add New Department':
            addNewDepartment();
            break;
        case 'Add New Role':
            addNewRole();
            break;
        case 'Update An Employees Role':
            updateEmployee();
            break;
        case 'View Budget by Department':
            budgetByDepartment();
            break;
        case 'Exit':
            exit();
            break;
    }
}

const exit = () => {
    console.log('Exiting');
    process.exit();
}

init();

const viewEmployees = () => {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary,
    CONCAT(manager.first_name,' ',manager.last_name) AS manager_name
    FROM employees
    JOIN roles ON employees.roles_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id;`;
    db.query(query, (err, result) => {
        if (err) throw err
        console.log('You are viewing all employees!');
        console.table(result);
        init();
    });
};

const viewDepartments = () => {
    const query = `SELECT * FROM departments;`;
    db.query(query, (err, result) => {
        if (err) throw err
        console.log('You are viewing all departments!');
        console.table(result)
        init();
    });
};

const viewRoles = () => {
    const query = `SELECT roles.id, roles.title, roles.salary, departments.department_name
    FROM roles
    JOIN departments ON roles.department_id = departments.id;`;
    db.query(query, (err, result) => {
        if (err) throw err
        console.log('You are viewing all roles!');
        console.table(result)
        init();
    });
};

const addNewDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter name of new department:',
        },
    ])
        .then((answer) => {
            const query = 'INSERT INTO departments (department_name) VALUES (?);';
            db.query(query, [answer.departmentName], (err, result) => {
                if (err) throw err;
                console.log('New department added!');
                viewDepartments();
                init();
            });
        });
};

const viewEmployeeByDepartment = () => {
    const query = "SELECT * FROM departments";
    db.query(query, (err, result) => {
        if (err) throw err;
        inquirer.prompt(
            {
                type: 'list',
                name: 'department',
                message: 'Select department of to view employees:',
                choices: result.map((department) => department.department_name),
            },
        )
            .then((answer) => {
                return viewEmployeeByDepartmentNext(answer.department);
            })
    })
};

function viewEmployeeByDepartmentNext(department) {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS department 
     FROM employees 
     LEFT JOIN roles ON employees.roles_id = roles.id 
     LEFT JOIN departments ON roles.department_id = departments.id 
     WHERE departments.department_name = ?;`;
    db.query(query, department, (err, result) => {
        if (err) throw err;
        console.log("You are viewing employees from the selected department!");
        console.table(result);
        init();
    });
}

const updateEmployee = () => {
    const employeeQuery = "SELECT employees.id, employees.first_name, employees.last_name, roles.title FROM employees JOIN roles ON employees.roles_id = roles.id"
    const roleQuery = "SELECT * FROM roles";
    db.query(employeeQuery, (err, employeeRes) => {
        if (err) throw err;
        db.query(roleQuery, (err, roleRes) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employees',
                    message: 'Select employee to update:',
                    choices: employeeRes.map((employees) => `${employees.first_name} ${employees.last_name}`),
                },
                {
                    type: 'list',
                    name: 'roles',
                    message: 'Select the role to update:',
                    choices: roleRes.map((roles) => roles.title),
                },
            ])
                .then((answer) => {
                    const selectedEmployee = answer.employees.split(" ");
                    const firstName = selectedEmployee[0];
                    const lastName = selectedEmployee[1];
                    const query = `SELECT id FROM roles WHERE title = ?`;
                    db.query(query, [answer.roles], (err, data) => {
                        if (err) throw err;
                        const roleId = data[0].id;
                        const query = `UPDATE employees SET roles_id = ? WHERE first_name = ? AND last_name = ?`;
                        db.query(query,
                            [roleId, firstName, lastName],
                            (err, data) => {
                                if (err) throw err;
                                console.log("You have updated the employee!");
                                init();
                            }
                        )
                    }
                    );
                });
        });
    }
    );
}

const budgetByDepartment = () => {
    const query = `SELECT departments.department_name AS department, 
SUM (roles.salary) AS utilized_budget
FROM employees 
LEFT JOIN roles ON employees.roles_id = roles.id 
LEFT JOIN departments ON roles.department_id = departments.id 
GROUP BY departments.department_name;`;
    db.query(query, (err, result) => {
        if (err) throw err;
        console.table(result);
        console.log("You are viewing budget by department!");
        init();
    })
}

function addNewRole() {
    const query = "SELECT * FROM departments";
    db.query(query, (err, result) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter title of new role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary of new role:',
            },
            {
                type: 'list',
                name: 'departments',
                message: 'Select department of new role:',
                choices: result.map((departments) => departments.department_name),
            },
        ])
            .then((answer) => {
                const { title, salary, departments } = answer;
                const query = `INSERT INTO roles (title, salary, department_id)
                SELECT ?, ?, departments.id
                FROM departments
                WHERE departments.department_name = ?`;
                db.query(query, [title, salary, departments],
                    (err, result) => {
                        if (err) throw err;
                        console.log('New role added!');
                        viewRoles();
                        init();
                    });
            });
    });
};

// TODO
const addNewEmployee = () => {
    let newEmployee;
    const rolesQuery = `SELECT roles.id, roles.title FROM roles WHERE title NOT LIKE '%QB%';`;
    Promise.resolve()
        .then(() => {
            return new Promise((resolve, reject) => {
                db.query(rolesQuery, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        })
        .then((rolesRes) => {
            const roles = rolesRes.map((roles) => `Role title: ${roles.title}, Role ID: ${roles.id}`
            );
            return inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "Enter first name of employee:",
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "Enter last name of employee:",
                },
                {
                    name: "roles",
                    type: "list",
                    message: "Enter the role of the employee:",
                    choices: roles,
                },
            ]);
        })
        .then((answer) => {
            newEmployee = answer;
            const managerQuery = `SELECT 
            manager.id AS manager_id,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
            FROM employees
            LEFT JOIN roles ON employees.roles_id = roles.id
            LEFT JOIN employees AS manager ON manager.id = employees.manager_id 
            WHERE manager.id IS NOT NULL
            GROUP BY manager_id;`;
            return new Promise((resolve, reject) => {
                db.query(managerQuery, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        })
        .then((managerRes) => {
            const managers = managerRes.map((manager) => `${manager.manager_name} ID:${manager.manager_id}`);
            return inquirer.prompt([
                {
                    name: "manager",
                    type: "list",
                    message: "Which manager is the employee under?",
                    choices: [...managers, "None"],
                },
            ]);
        })
        .then((answer) => {
            const employeeQuery = `INSERT INTO employees
            (first_name, last_name, roles_id, manager_id) 
            VALUES (?, ?, ?, ?)`;
            db.query(employeeQuery,
                [
                    newEmployee.first_name,
                    newEmployee.last_name,
                    newEmployee.roles.split("ID: ")[1],
                    answer.manager.split("ID:")[1],
                ],
                (err, result) => {
                    if (err) throw err;
                    console.log(
                        `Added employee to the database`
                    );
                    viewEmployees();
                }
            );
        });

}

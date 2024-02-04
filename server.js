//Originally had all functions in separate files in "helpers" folder, but exports and connection errored out. Eventually moved them all to here
//Require and install MySQL2, Inquirer, dotenv (hide data) and cfonts (for command line title)
//Import initalQuestions to clean up javascript
const inquirer = require('inquirer');
const mySQL = require('mysql2');
require('dotenv').config();
const cfonts = require('cfonts');
const { initialQuestions } = require('./helpers/questions');

//Create connection to database using protected/hidden data in env 
const db = mySQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//Console log an error in connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

//Special cfonts from github to create title for command-line (copy and pasted)
cfonts.say('NFL Company!', {
    font: 'block',
    align: 'left',
    colors: ['system'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
    gradient: false,
    independentGradient: false,
    transitionGradient: false,
    env: 'node'
});

//Initial function to begin inquirer prompt for all questions
//Cleaned up code by using switch and case for answer choice and defining functions separately below
//Also included an "exit" to get out of the prompt
const init = async () => {
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

//Exit function to end db connection and get out of prompt
const exit = () => {
    console.log('Exiting');
    db.end();
    process.exit();
}

//Begin initial function upon node server.js command
init();

//FUNCTIONS FOR VIEWING EMPLOYEES, DEPARTMENTS AND ROLES//

//View employees function
//Create a variable for query that needs to be obtained (SELECT...FROM)
//Used CONCAT to combined first and last name to define manager (manager_name) as one piece of data
//Used JOIN to specifically show all applicable data for employees per challenge (connects foreign keys)
//Use connection and query to obtain results and console.log/table results
//Re-initiate initial function to start over
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

//View departments function
//Similar process as employees
const viewDepartments = () => {
    const query = `SELECT * FROM departments;`;
    db.query(query, (err, result) => {
        if (err) throw err
        console.log('You are viewing all departments!');
        console.table(result)
        init();
    });
};

//View roles function
//Similar process as employees
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

//FUNCTIONS FOR ADDING EMPLOYEES, DEPARTMENTS AND ROLES//

//Add department function
//Begin a new inquirer to determine new department name
//Create a query for inserting new department name into departments table
//Use that answer and query in db.query to insert the new department
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
            });
        });
};

//Add role function
function addNewRole() {
    //Create a query variable to select all data from departments
    const query = "SELECT * FROM departments";
    db.query(query, (err, result) => {
        if (err) throw err;
        //Begin prompt for role title, salary and department
        //Departments will be in list form to choose from from query above
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
                //Save responses as variable from prompt answers
                const { title, salary, departments } = answer;
                //New query that inserts data above into roles table in new row
                const query = `INSERT INTO roles (title, salary, department_id)
                SELECT ?, ?, departments.id
                FROM departments
                WHERE departments.department_name = ?`;
                //Run the db.query and show results
                db.query(query, [title, salary, departments],
                    (err, result) => {
                        if (err) throw err;
                        console.log('New role added!');
                        viewRoles();
                    });
            });
    });
};

//Add new employee function
const addNewEmployee = () => {
    //Define a newEmployee variable to utilize late in function
    let newEmployee;
    //Create a query variable to select data from roles table to use below
    const rolesQuery = `SELECT roles.id, roles.title FROM roles WHERE title NOT LIKE '%QB%';`;
    //Promise resolve allows for ordered structure of commands 
    Promise.resolve()
        .then(() => {
            return new Promise((resolve, reject) => {
                //Obtain results from db.query of rolesQuery defined above
                db.query(rolesQuery, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        })
        .then((rolesRes) => {
            //Creates a variable "roles" that will include role title and id from query run above
            //This will be useful in list dropdown in command line to provide each role with it's id
            //The id then can be "split" from prompt answer and used as foreign key to update in employees table
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
            //Store answers in newEmployee variable that is used below
            newEmployee = answer;
            //Again create a variable for SELECT...FROM to organize inputs
            //This query sets manager.id as manager_id and manager.first/last name as manager_name
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
            //Store results from above db.query in manager variable
            //Obtains manager name (concat) and respective ID to be used in list below in prompt
            //ID can later be split from manager name when inputted in employees table
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
            //Create query to insert answers from both prompts into new employee row
            const employeeQuery = `INSERT INTO employees
            (first_name, last_name, roles_id, manager_id) 
            VALUES (?, ?, ?, ?)`;
            db.query(employeeQuery,
                //Split functionality to only obtain ID number (used as foreign key)
                //Kept role title and manager name in prompt because it's easier for user to select rather than just an id
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

//ADDITIONAL FUNCTIONS (BONUS)//

//View employees by department function
//Broke this up into two functions. First, select a department (below). Second, select employees within that department
//Similar function to above to provide deparment list in prompt
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

//Second function in the employee by department functionaility
//Utilize department department name (obtained above) within query
//Select applicable employee information WHERE department (name) is selected/used
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

//Update employee's role function
//Create two query variables (employee and roles) to use in prompt lists and get results from db.query()
const updateEmployee = () => {
    const employeeQuery = "SELECT employees.id, employees.first_name, employees.last_name, roles.title FROM employees JOIN roles ON employees.roles_id = roles.id"
    const roleQuery = "SELECT * FROM roles";
    db.query(employeeQuery, (err, employeeRes) => {
        if (err) throw err;
        db.query(roleQuery, (err, roleRes) => {
            if (err) throw err;
            //Queries above allow use to view a list of all employees and select form all roles in prompt 
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
                    //Since employees are by full name above (stored as answer), we can split the name selected into first and last
                    //Also create a query to select id from roles table for title that matches id selected
                    const selectedEmployee = answer.employees.split(" ");
                    const firstName = selectedEmployee[0];
                    const lastName = selectedEmployee[1];
                    const query = `SELECT id FROM roles WHERE title = ?`;
                    db.query(query, [answer.roles], (err, result) => {
                        if (err) throw err;
                        //Set roleID to result from query run above that provides role now as an id
                        const roleId = result[0].id;
                        //Create query to update the employee role by setting new data in roles_id, firstname, and last name
                        const query = `UPDATE employees SET roles_id = ? WHERE first_name = ? AND last_name = ?`;
                        db.query(query,
                            //Answers from prompt defined in variables above
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

//Budget by department function
//Select all department names and sum the roles salary (store as utilizied budget column)
//Group sums by department
//Run similar db.query()
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



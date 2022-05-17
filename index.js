//Activity 21
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');


const PORT = process.env.PORT || 3001;
const app = express();

const logo = require('asciiart-logo');
const config = require('./package.json');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Bing070318',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);
//Welcome heading
console.log(
    logo({
        name: 'Employee Management System',
        font: 'Speed',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'bold-green',
        textColor: 'green',
    })
        .render()
);


function initPromptLoop() {
    inquirer
        .prompt(

            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ["View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a role",
                    "Add an employee",
                    "Update employee role",
                    "Exit"],
            }).then(choice => {
                if (choice.action === 'View all departments') {
                    viewDepartments();
                } else if (choice.action === 'View all roles') {
                    viewRoles();
                } else if (choice.action === 'View all employees') {
                    viewEmployees();
                } else if (choice.action === 'Add a role') {
                    addRole();
                } else if (choice.action === 'Add an employee') {
                    addEmployee();
                } else if (choice.action === 'Update employee role') {
                    updateRole();
                }
                else if (choice.action === 'Exit') {
                    connection.end();
                }
            })
};
// Selection to view all of the departments.
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        console.table(res);
        initPromptLoop();
    });
};
// Selection to view all of the roles.
function viewRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        console.table(res);
        initPromptLoop();
    });
};
// Selection to view all of the employees.
function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        console.table(res);
        initPromptLoop();
    });
};

// Selection to add a new role.
function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        console.log("\n");
        console.table(res);
    });

    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the Title of the new role?",
            },
            {
                type: "number",
                name: "salary",
                message: "What is the salary of the new role?"
            },
            {
                type: "number",
                name: "department_id",
                message: "Which department id# does this role fall under?",
            }
        ])
        .then(function (response) {
            console.log(response);
            //Hardcoded query
            connection.query(
                `INSERT INTO roles SET ?`,
                response,
                (err, results) => {
                    console.log(results);
                    initPromptLoop();
                }
            );
        });
}
// Selection to add a new employee.
function addEmployee() {

    connection.query("SELECT * FROM roles", function (err, res) {
        console.log("\n");
        console.table(res);
    });

    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the first name of this Employee?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the last name of this Employee?"
            },
            {
                type: "number",
                name: 'role_id',
                message: `What Id # is the employee's role?`
            },
            {
                type: "number",
                name: "manager_id",
                message: "Which id# the employee's manager?"
            }
        ])
        .then(function (response) {
            console.log(response);
            connection.query(
                `INSERT INTO employee SET ?`,
                response,
                (err, results) => {
                    console.log(results);
                    initPromptLoop();
                }

            );
        });
}

// Selection to update a role for a specific employee.

async function updateRole() {
    let employeeArray = await connection.query('SELECT role_id, first_name FROM role ORDER BY role.id;')
    const employeeId = await inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Choose an Employee to Update",
                choices: employeeArray.map(res => res.first_name)
            }
        ]);

    let roleId;
    for (const row of res) {
        if (row.title === role) {
            roleId = row.id;
            continue;
        }
    }
    // Goes back to 
    connection.query(
        `UPDATE roles SET role_id = ${role_id}
                WHERE employee.id = ${employeeId.name}`, async (err, res) => {
        if (err) throw err;
        console.log(results);
        addRole();
    }
    );
};


// call the initPromptLoop function to start the Prompt Questions
initPromptLoop();

app.use((req, res) => {
    res.status(404).end();
});
// Connect to the database before starting the Express.js server

app.listen(PORT, () => {
    console.log('Now listening');
});


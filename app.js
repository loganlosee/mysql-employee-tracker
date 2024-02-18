const mysql = require("mysql2");
const inquirer = require("inquirer");

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Mother-32',
    database: 'company_db'
});

// Connect to the database
connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');
    runMainMenu();
});

// Function to show the main menu
function runMainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then(answers => {
        switch (answers.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Exit':
                connection.end();
                break;
            default:
                console.log('Invalid action');
                runMainMenu();
        }
    });
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        runMainMenu();
    });
}

// ...

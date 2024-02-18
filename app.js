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

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the company database.');
    runMainMenu();
  });
  
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
          'Exit'
        ]
      }
    ]).then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
        default:
          console.log('Goodbye!');
          connection.end();
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
  
  function viewAllRoles() {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary 
                 FROM role
                 INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      console.table(results);
      runMainMenu();
    });
  }
  
  function viewAllEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager 
                 FROM employee e
                 LEFT JOIN role ON e.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee m ON e.manager_id = m.id`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      console.table(results);
      runMainMenu();
    });
  }
  
  function addDepartment() {
    inquirer
      .prompt({
        name: "newDepartment",
        type: "input",
        message: "Department name:",
      })
      .then(function (answer) {
        const query = "INSERT INTO department SET ?";
        connection.query(
          query,
          {
            name: answer.newDepartment,
          },
          function (err, data) {
            if (err) throw err;
            console.log("Department added.");
            viewDepartment();
          }
        );
      })
      .catch((err) => console.error(err));
  }
  
  function addRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Title of Role: ",
        },
        {
          name: "salary",
          type: "input",
          message: "Salary:",
        },
        {
          name: "departmentId",
          type: "list",
          message: "Department ID:",
          choices: function () {
            const query = "SELECT * FROM department";
            return connection
              .promise()
              .query(query)
              .then((departments) => {
                return departments[0].map((department) => {
                  return {
                    name: department.name,
                    value: department.id,
                  };
                });
              });
          },
        },
      ])
      .then(function (answer) {
        const query = "INSERT INTO role SET ?";
        connection.query(
          query,
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId,
          },
          function (err, data) {
            if (err) throw err;
            console.log("Role added.");
            viewRole();
          }
        );
      });
  }
  
  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "First Name: ",
        },
        {
          name: "lastName",
          type: "input",
          message: "Last Name:",
        },
        {
          name: "roleId",
          type: "list",
          message: "Role ID:",
          choices: function () {
            const query = "SELECT * FROM role";
            return connection
              .promise()
              .query(query)
              .then((roles) => {
                return roles[0].map((role) => {
                  return {
                    name: role.title,
                    value: role.id,
                  };
                });
              });
          },
        },
        {
          name: "managerId",
          type: "list",
          message: "Manager ID:",
          choices: function () {
            const query = "SELECT * FROM employee";
            return connection
              .promise()
              .query(query)
              .then((employees) => {
                return employees[0].map((employee) => {
                  return {
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id,
                  };
                });
              });
          },
        },
      ])
      .then(function (answer) {
        const query = "INSERT INTO employee SET ?";
        connection.query(
          query,
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          function (err, data) {
            if (err) throw err;
            console.log("Employee added.");
            viewEmployee();
          }
        );
      });
  }  
  
  function viewDepartment() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, data) {
      if (err) throw err;
      console.table(data);
      runMainMenu();
    });
  }
  function viewRole() {
    const query =
      "SELECT role.id, role.title, role.salary, department.name AS department_name FROM role JOIN department ON role.department_id = department.id;";
    connection.query(query, function (err, data) {
      if (err) throw err;
      console.table(data);
      runMainMenu();
    });
  }
  
  function viewEmployee() {
    const query = `SELECT 
        employee.id, employee.first_name, employee.last_name, role.title AS role, CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department 
      FROM employee 
      LEFT JOIN role ON employee.role_id = role.id 
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id 
      LEFT JOIN department ON role.department_id = department.id;`;
    connection.query(query, function (err, data) {
      if (err) throw err;
      console.table(data);
      runMainMenu();
    });
  }
  

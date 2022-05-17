DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE
    SET
        NULL
);

INSERT INTO
    department (name)
VALUES
    ('Management'),
    ("Sales"),
    ("Accounting"),
    ("Administration"),
    ("Human Resources");

INSERT INTO
    roles (title, salary, department_id)
VALUES
    ('General Manager', 150000, 1),
    ('Sales', 100000, 2),
    ('Accountant', 90000, 4),
    ('Administration', 40000, 3),
    ('HR Rep', 75000, 5),
    ('CEO', 200000, 1),
    ('Temp', 32000, 5);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 1, null),
    ('Dwight', 'Schrute', 2, 1),
    ('Hudson', 'Stanley', 2, 1),
    ('Pam', 'Beasley', 4, 1),
    ('Howard', 'Ryan', 7, 1),
    ('Toby', 'Flenderson', 5, null),
    ('Levinson', 'Jan', 6, null),
    ('Martin', 'Angela', 4, 1);


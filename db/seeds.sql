INSERT INTO
    department (department_name)
VALUES
    ('Management'),
    ("Sales"),
    ("Accounting"),
    ("Administration"),
    ("Human Resources");

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 1, 6),
    ('Dwight', 'Schrute', 2, 1),
    ('Hudson', 'Stanley', 2, 1),
    ('Pam', 'Beasley', 4, 1),
    ('Howard', 'Ryan', 7, 1),
    ('Toby', 'Flenderson', 5, 6),
    ('Levinson', 'Jan', 6, 0),
    ('Martin', 'Angela', 4, 1);

INSERT INTO
    roles (title, salary, department_id)
VALUES
    ('General Manager', 150000, 1),
    ('Sales', 100000, 2),
    ('Accountant', 90000, 4),
    ('Administration', 40000, 3),
    ('HR Rep', 75000, 5),
    ('CEO', 200000, 6),
    ('Temp', 32000, 7);
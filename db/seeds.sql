INSERT INTO departments (department_name)
VALUES
('Patriots'),
('Colts'),
('Chiefs'),
('49ers');

INSERT INTO roles (title, salary, department_id)
VALUES
('Patriots QB', 30000000, 1),
('Colts QB', 30000000, 2),
('Chiefs QB', 30000000, 3),
('49ers QB', 30000000, 4),
('Patriots TE', 5000000, 1),
('Colts TE', 5000000, 2),
('Chiefs TE', 5000000, 3),
('49ers TE', 5000000, 4),
('Patriots WR', 15000000, 1),
('Colts WR', 15000000, 2),
('Chiefs WR', 15000000, 3),
('49ers WR', 15000000, 4),
('Patriots RB', 10000000, 1),
('Colts RB', 10000000, 2),
('Chiefs RB', 10000000, 3),
('49ers RB', 10000000, 4);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
('Tom', 'Brady', 1, NULL),
('Peyton', 'Manning', 2, NULL),
('Patrick', 'Mahomes', 3, NULL),
('Joe', 'Montana', 4, NULL),
('Rob', 'Gronkowski', 5, 1),
('Dallas', 'Clark', 6, 2),
('Travis', 'Kelce', 7, 3),
('Brent', 'Jones', 8, 4),
('Julian', 'Edelman', 9, 1),
('Marvin', 'Harrison', 10, 2),
('Tyreek', 'Hill', 11, 3),
('Jerry', 'Rice', 12, 4),
('Corey', 'Dillon', 13, 1),
('Edgerrin', 'James', 14, 2),
('Kareem', 'Hunt', 15, 3),
('Roger', 'Craig', 16, 4);
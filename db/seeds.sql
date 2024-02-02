INSERT INTO departments (department_name)
VALUES
('Patriots'),
('Bills'),
('Dolphins'),
('Jets');

INSERT INTO roles (role_name, role_salary, department_id)
VALUES
('Patriots QB', 30000000, 1),
('Bills QB', 30000000, 2),
('Dolphins QB', 30000000, 3),
('Jets QB', 30000000, 4),
('Patriots TE', 5000000, 1),
('Bills TE', 5000000, 2),
('Dolphins TE', 5000000, 3),
('Jets TE', 5000000, 4),
('Patriots WR', 15000000, 1),
('Bills WR', 15000000, 2),
('Dolphins WR', 15000000, 3),
('Jets WR', 15000000, 4),
('Patriots RB', 10000000, 1),
('Bills RB', 10000000, 2),
('Dolphins RB', 10000000, 3),
('Jetss RB', 10000000, 4);

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
USE company_db;

INSERT INTO departments(department_name, roles_id)
VALUES
('Patriots', 1),
('Bills', 2),
('Dolphins', 3),
('Jets', 4);

INSERT INTO employees(first_name, last_name, roles_id, manager_id)
VALUES
('Tom', 'Brady', 1, 1),
('Peyton', 'Manning', 2, 2),
('Patrick', 'Mahomes', 3, 3),
('Joe', 'Montana', 4, 4),
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

INSERT INTO roles(role_name, role_salary, department_id)
VALUES
('Quarterback', 30000000, 1),
('Quarterback', 30000000, 2),
('Quarterback', 30000000, 3),
('Quarterback', 30000000, 4),
('Tight End', 5000000, 1),
('Tight End', 5000000, 2),
('Tight End', 5000000, 3),
('Tight End', 5000000, 4),
('Wide Receiver', 15000000, 1),
('Wide Receiver', 15000000, 2),
('Wide Receiver', 15000000, 3),
('Wide Receiver', 15000000, 4),
('Running Back', 10000000, 1),
('Running Back', 10000000, 2),
('Running Back', 10000000, 3),
('Running Back', 10000000, 4);
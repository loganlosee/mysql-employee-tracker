INSERT INTO department (name) VALUES
  ('Product Development'),
  ('Accounting'),
  ('People Operations'),
  ('Digital Marketing'),
  ('Cybersecurity'),
  ('Logistics'),
  ('Client Relations'),
  ('Innovation Lab'),
  ('Compliance'),
  ('Corporate Strategy');

  INSERT INTO role (title, salary, department_id) VALUES
  ('Product Manager', 72000.00, 1),
  ('Accountant', 68000.00, 2),
  ('Recruitment Lead', 63000.00, 3),
  ('SEO Specialist', 62000.00, 4),
  ('Cybersecurity Analyst', 75000.00, 5),
  ('Logistics Coordinator', 69000.00, 6),
  ('Client Success Manager', 64000.00, 7),
  ('Research Scientist', 78000.00, 8),
  ('Compliance Officer', 77000.00, 9),
  ('Strategy Consultant', 80000.00, 10);

  INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Ethan', 'Morris', 1, NULL),
  ('Lily', 'Evans', 1, NULL),
  ('Noah', 'Green', 2, 1),
  ('Sophia', 'Hall', 2, 1),
  ('Mason', 'Edwards', 3, 1),
  ('Isabella', 'Murphy', 4, 2),
  ('Lucas', 'Garcia', 5, 1),
  ('Mia', 'Rodriguez', 5, 3),
  ('Oliver', 'Lopez', 6, 1),
  ('Amelia', 'Gonzalez', 6, 2);
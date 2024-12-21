USE crudgames;

CREATE TABLE IF NOT EXISTS games (
    idgames INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL
);

INSERT INTO games (name, cost, category) VALUES
('Hope', 35.00, 'Dance'),
('Super Mario', 70.00, 'Fun'),
('FIFA', 45.00, 'Foot');

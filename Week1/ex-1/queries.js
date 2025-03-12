export const createDBQuery = `
  DROP DATABASE IF EXISTS meetup;
  CREATE DATABASE meetup;
  USE meetup;
`;

export const createTablesQueries = `
  CREATE TABLE Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(50) NOT NULL,
    invited_by VARCHAR(50) NOT NULL
  );

  CREATE TABLE Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(100) NOT NULL,
    floor_number TINYINT NOT NULL
  );

  CREATE TABLE Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(100) NOT NULL,
    starting_time DATETIME NOT NULL,
    ending_time DATETIME NOT NULL,
    room_no INT NOT NULL,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  );
`;

export const insertDataQueries = `
  INSERT INTO Room (room_name, floor_number)
  VALUES
    ('Room One', 1),
    ('Room Two', 2),
    ('Room Three', 3),
    ('Room Four', 4),
    ('Room Five', 5);

  INSERT INTO Invitee (invitee_name, invited_by)
  VALUES
    ('Leonardo DiCaprio', 'Christopher Nolan'),
    ('Colin Farrell', 'Ridley Scott'),
    ('Robert De Niro', 'Martin Scorsese'),
    ('Morgan Freeman', 'David Fincher'),
    ('Al Pacino', 'David Lynch');

  INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
  VALUES
    ('Meeting 1', '2025-03-01 10:00:00', '2025-03-01 12:00:00', 1),
    ('Meeting 2', '2025-03-02 12:00:00', '2025-03-02 14:00:00', 2),
    ('Meeting 3', '2025-03-03 14:00:00', '2025-03-03 16:00:00', 3),
    ('Meeting 4', '2025-03-03 16:00:00', '2025-03-03 18:00:00', 4),
    ('Meeting 5', '2025-03-03 18:00:00', '2025-03-03 20:00:00', 5);
`;
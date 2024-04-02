-- Drop Tables
DROP TABLE IF EXISTS Trains;
DROP TABLE IF EXISTS MemberBelongsToGroup;
DROP TABLE IF EXISTS FitnessGroup_Name;
DROP TABLE IF EXISTS FitnessGroup_Desc;
DROP TABLE IF EXISTS Trains;
DROP TABLE IF EXISTS WorkoutConsistsExercise;
DROP TABLE IF EXISTS Exercise_Writes_Logs;
DROP TABLE IF EXISTS MemberDoesWorkout;
DROP TABLE IF EXISTS Workout_Has;
DROP TABLE IF EXISTS WorkoutGoal;
DROP TABLE IF EXISTS BodyMeasurement_Records;
DROP TABLE IF EXISTS Achieves;
DROP TABLE IF EXISTS Achievement_Name;
DROP TABLE IF EXISTS Achievement_Desc;
DROP TABLE IF EXISTS General_Employee;
DROP TABLE IF EXISTS Trainer;
DROP TABLE IF EXISTS Member;
DROP TABLE IF EXISTS Users;

-- Create Tables 
CREATE TABLE Users (
	Date_of_Birth DATE,
	Gender CHAR(20),
	Name CHAR(50) UNIQUE,
	UserID INTEGER,
	Phone_Number VARCHAR(20) UNIQUE,
	Email_Address CHAR(50),
	PRIMARY KEY (UserID)
);

CREATE TABLE Member (
	UserID INTEGER,
	GymPlan CHAR(20),
	PRIMARY KEY (UserID),
	FOREIGN KEY (UserID) REFERENCES USERS ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Trainer (
	UserID INTEGER,
	Salary INTEGER,
	Permanent BIT,
	PRIMARY KEY (UserID),
	FOREIGN KEY (UserID) REFERENCES Users ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE General_Employee(
	UserID INTEGER,
	Salary INTEGER,
	Role CHAR(20),
	PRIMARY KEY (UserID),
	FOREIGN KEY (UserID) REFERENCES Users ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Achievement_Desc (
	AchievementName CHAR(50),
	AchievementDescription CHAR(100),
	PRIMARY KEY (AchievementName)
);

CREATE TABLE Achievement_Name (
	AchievementID INTEGER,
	AchievementName CHAR(50),
	PRIMARY KEY (AchievementID),
	FOREIGN KEY (AchievementName) REFERENCES Achievement_Desc ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Achieves(
	AchievementID INTEGER,
	UserID INTEGER,
	PRIMARY KEY (AchievementID, UserID),
	FOREIGN KEY(AchievementID) REFERENCES Achievement_Name,
	FOREIGN KEY(UserID) REFERENCES Member
);

CREATE TABLE BodyMeasurement_Records (
	Date DATE,
	UserID INTEGER,
	BMI REAL,
	BodyFat INTEGER,
	Height REAL,
	Weight REAL,
	PRIMARY KEY (Date, UserID),
	FOREIGN KEY (UserID) REFERENCES Users ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE WorkoutGoal (
	GoalID INTEGER,
	Duration TIME,
	TargetCalories INTEGER,
	PRIMARY KEY (GoalID)
);

CREATE TABLE Workout_Has (
	WorkoutID INTEGER,
	GoalID INTEGER NOT NULL,
	Name CHAR(50),
	Difficulty CHAR(10),
	PRIMARY KEY (WorkoutID),
	FOREIGN KEY (GoalID) REFERENCES WorkoutGoal ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE MemberDoesWorkout(
	WorkoutID INTEGER,
	UserID INTEGER,
	PRIMARY KEY (WorkoutID, UserID),
	FOREIGN KEY(WorkoutID) REFERENCES Workout_Has,
	FOREIGN KEY(UserID) REFERENCES Member
);

CREATE TABLE Exercise_Writes_Logs (
	ExerciseID INTEGER,
	LogID INTEGER UNIQUE NOT NULL,
	Name CHAR(20),
	Reps INTEGER,
	Sets INTEGER,
	Weight INTEGER,
	HeartRate INTEGER,
	CaloriesBurnt INTEGER,
	Date DATE,
	Duration TIME,
	PRIMARY KEY (ExerciseID)
);

CREATE TABLE WorkoutConsistsExercise(
	WorkoutID INTEGER,
	ExerciseID INTEGER,
	PRIMARY KEY (WorkoutID, ExerciseID),
	FOREIGN KEY(WorkoutID) REFERENCES Workout_Has,
	FOREIGN KEY(ExerciseID) REFERENCES Exercise_Writes_Logs
);

CREATE TABLE FitnessGroup_Desc (
	Name CHAR(50),
	Description CHAR(100) PRIMARY KEY(Name),
);

CREATE TABLE FitnessGroup_Name (
	GroupID INTEGER,
	Name CHAR(50) PRIMARY KEY (GroupID),
	FOREIGN KEY (Name) REFERENCES FitnessGroup_Desc ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Trains (
	GroupID INTEGER NOT NULL,
	UserID INTEGER,
	PRIMARY KEY (GroupID, UserID),
	FOREIGN KEY(GroupID) REFERENCES FitnessGroup_Name ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(UserID) REFERENCES Trainer
);

CREATE TABLE MemberBelongsToGroup(
	GroupID INTEGER,
	UserID INTEGER NOT NULL,
	PRIMARY KEY (GroupID, UserID),
	FOREIGN KEY(GroupID) REFERENCES FitnessGroup_Name,
	FOREIGN KEY(UserID) REFERENCES Member ON DELETE CASCADE ON UPDATE CASCADE
);


-- Insert Data to Populate Tables

-- Insert data into Users table
INSERT INTO
    Users (
        Date_of_Birth,
        Gender,
        Name,
        UserID,
        Phone_Number,
        Email_Address
    )
VALUES
    (
        '1990-05-15',
        'Male',
        'John Doe',
        1,
        6041234567,
        'john.doe@gmail.com'
    ),
    (
        '2001-12-10',
        'Female',
        'Jane Smith',
        2,
        6045556969,
        'jane123@gmail.com'
    ),
    (
        '2003-08-20',
        'Non-Binary',
        'Alex Lee',
        3,
        7789876542,
        'alex986@gmail.com'
    ),
    (
        '1998-03-25',
        'Male',
        'Michael Johnson',
        4,
        7784521234,
        'michaelJ@gmail.com'
    ),
    (
        '1994-11-01',
        'Female',
        'Emily Brown',
        5,
        2364589874,
        'emily.brown@gmail.com'
    ),
    (
        '2002-07-03',
        'Male',
        'William Taylor',
        6,
        6043259687,
        'wtaylor@gmail.com'
    ),
    (
        '1994-08-03',
        'Female',
        'Diya Hutchinson',
        7,
        2366047789,
        'diya1994@gmail.com'
    ),
    (
        '1899-07-03',
        'Demon',
        'Rebecca Taylor',
        8,
        7781694242,
        'rebecca1899@gmail.com'
    ),
    (
        '2001-07-03',
        'Female',
        'Sylvia McKanzie',
        9,
        6049876543,
        'sylviaM2001@gmail.com'
    ),
    (
        '2000-11-26',
        'Male',
        'Rex Cooldridge',
        10,
        6046046046,
        'rexcool@gmail.com'
    ),
    (
        '2004-06-01',
        'Male',
        'Josh Smith',
        11,
        7787787787,
        'josh.smith2004@gmail.com'
    ),
    (
        '1998-08-05',
        'Non-Binary',
        'Alex Chan',
        12,
        2362362362,
        'alex1998@gmail.com'
    ),
    (
        '1999-05-12',
        'Female',
        'Vicki Chen',
        13,
        6047781234,
        'vickiChen1999@gmail.com'
    ),
    (
        '2002-01-01',
        'Female',
        'Vicky Lou',
        14,
        7786041234,
        'vickyLou2002@gmail.com'
    ),
    (
        '1995-10-21',
        'Male',
        'John Cena',
        15,
        7783564598,
        'john1234@gmail.com'
    ),
    (
        '1996-10-21',
        'Male',
        'Johnny Ape',
        16,
        7783564895,
        'a@yahoo.com'
    ),
    (
        '1997-10-21',
        'Male',
        'Bobby Ape',
        17,
        6043564895,
        'ab@yahoo.com'
    );

-- Insert data into Member table
INSERT INTO
    Member (UserID, GymPlan)
VALUES
    (1, 'Basic'),
    (2, 'Basic+'),
    (3, 'Pro'),
    (4, 'Unlimited'),
    (5, 'Unlimited'),
    (16, 'Pro'),
    (17, 'Basic');

-- Insert data into Trainer table
INSERT INTO
    Trainer (UserID, Salary, Permanent)
VALUES
    (6, 65000, 1),
    (7, 50000, 0),
    (8, 68000, 1),
    (9, 60000, 0),
    (10, 60000, 0);

-- Insert data into General_Employee table
INSERT INTO
    General_Employee (UserID, Salary, Role)
VALUES
    (11, 42000, 'Janitor'),
    (12, 41000, 'Janitor'),
    (13, 41000, 'Security Guard'),
    (14, 41000, 'Front Desk'),
    (15, 40000, 'Front Desk');

-- Insert data into Achievement_Desc table
INSERT INTO
    Achievement_Desc (AchievementName, AchievementDescription)
VALUES
    (
        'Glutes Galant',
        'Completed a glutes workout of 30+ minutes.'
    ),
    (
        'Biceps Beast',
        'Lifted twice their body weight in deadlifts.'
    ),
    ('Cardio King', 'Ran a 5k.'),
    (
        'Crosstrainer Expert',
        'Covered a distance of 5k.'
    ),
    ('Rowing Ruler', 'Rowed a distance of 5k.');

-- Insert data into Achievement_Name table
INSERT INTO
    Achievement_Name (AchievementID, AchievementName)
VALUES
    (1, 'Glutes Galant'),
    (2, 'Biceps Beast'),
    (3, 'Cardio King'),
    (4, 'Crosstrainer Expert'),
    (5, 'Rowing Ruler');

-- Insert data into Achieves table
INSERT INTO
    Achieves (AchievementID, UserID)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (2, 4),
    (3, 4),
    (5, 5);

-- Insert data into BodyMeasurement_Records table
-- Height is in cm
-- Weight is in kg
INSERT INTO
    BodyMeasurement_Records (Date, UserID, BMI, BodyFat, Height, Weight)
VALUES
    ('2023-07-01', 1, 25.5, 18, 175.5, 70),
    ('2023-07-02', 2, 22.1, 15, 160.2, 58),
    ('2023-07-03', 3, 28.0, 22, 180.0, 80),
    ('2023-07-04', 4, 22.8, 20, 175.0, 70),
    ('2023-07-04', 5, 22.1, 20, 165.1, 60),
    ('2023-07-01', 16, 22.1, 7, 165.1, 60),
    ('2023-07-01', 17, 22.1, 5, 165.1, 60);

-- Insert data into WorkoutGoal table
INSERT INTO
    WorkoutGoal (GoalID, Duration, TargetCalories)
VALUES
    (1, '01:00:00', 500),
    (2, '00:45:00', 400),
    (3, '01:30:00', 600),
    (4, '01:15:00', 550),
    (5, '01:30:00', 600),
    (6, '01:00:00', 500);

-- Insert data into Workout_Has table
INSERT INTO
    Workout_Has (WorkoutID, GoalID, Name, Difficulty)
VALUES
    (101, 1, 'Cardio', 'Medium'),
    (102, 2, 'Strength Training', 'Hard'),
    (103, 3, 'Yoga', 'Easy'),
    (104, 4, 'Cycling', 'Medium'),
    (105, 4, 'Core Training', 'Medium');

-- Insert data into MemberDoesWorkout table
INSERT INTO
    MemberDoesWorkout (WorkoutID, UserID)
VALUES
    (101, 1),
    (102, 2),
    (103, 3),
    (104, 4),
    (102, 5);

-- Insert data into Exercise_Writes_Logs table
INSERT INTO
    Exercise_Writes_Logs (
        ExerciseID,
        LogID,
        Name,
        Reps,
        Sets,
        Weight,
        HeartRate,
        CaloriesBurnt,
        Date,
        Duration
    )
VALUES
    (
        201,
        1001,
        'Treadmill Run',
        30,
        3,
        100,
        120,
        300,
        '2023-07-01',
        '00:45:00'
    ),
    (
        202,
        1002,
        'Deadlift',
        8,
        4,
        200,
        140,
        400,
        '2023-07-02',
        '00:40:00'
    ),
    (
        203,
        1003,
        'Sun Salutations',
        12,
        1,
        60,
        200,
        150,
        '2023-07-03',
        '00:30:00'
    ),
    (
        204,
        1004,
        'HIIT Circuit',
        20,
        5,
        70,
        160,
        350,
        '2023-07-04',
        '00:50:00'
    ),
    (
        205,
        1005,
        'Zumba Dance',
        10,
        15,
        100,
        130,
        250,
        '2023-07-05',
        '00:55:00'
    ),
    (
        206,
        1006,
        'Pilates Plank',
        15,
        3,
        100,
        80,
        180,
        '2023-07-06',
        '00:45:00'
    );

-- Insert data into WorkoutConsistsExercise table
INSERT INTO
    WorkoutConsistsExercise (WorkoutID, ExerciseID)
VALUES
    (101, 201),
    (102, 202),
    (103, 203),
    (104, 204),
    (105, 205);

-- Insert data into FitnessGroup_Desc table
INSERT INTO
    FitnessGroup_Desc (Name, Description)
VALUES
    (
        'Cardio Fitness',
        'Group for individuals focused on improving cardiovascular health.'
    ),
    (
        'Strength Training',
        'Group for individuals interested in strength and muscle building.'
    ),
    (
        'Yoga Enthusiasts',
        'Group for individuals who enjoy practicing yoga.'
    ),
    (
        'Runners High',
        'Group for individuals who enjoy cardio'
    ),
    (
        'Heavy Bulkers',
        'Group for individuals who aim to bulk up and gain weight.'
    );

-- Insert data into FitnessGroup_Name table
INSERT INTO
    FitnessGroup_Name (GroupID, Name)
VALUES
    (501, 'Cardio Fitness'),
    (502, 'Strength Training'),
    (503, 'Yoga Enthusiasts'),
    (504, 'Runners High'),
    (505, 'Heavy Bulkers');

-- Insert data into Trains table
INSERT INTO
    Trains (GroupID, UserID)
VALUES
    (501, 7),
    (502, 6),
    (503, 8),
    (503, 9),
    (503, 10);

-- Insert data into MemberBelongsToGroup table
INSERT INTO
    MemberBelongsToGroup (GroupID, UserID)
VALUES
    (501, 1),
    (501, 2),
    (502, 2),
    (503, 2),
    (504, 2),
    (505, 2),
    (502, 4),
    (502, 5),
    (504, 5),
    (501, 16),
    (504, 16),
    (501, 17),
    (502, 17),
    (503, 17),
    (504, 17),
    (505, 17);
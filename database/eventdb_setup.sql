-- Database and Tables Setup Script
CREATE DATABASE EventDB;
GO

USE EventDB;
GO

CREATE TABLE Events (
  ID INT IDENTITY(1,1) PRIMARY KEY,
  EventName VARCHAR(100),
  EventDate VARCHAR(50)
);
GO

CREATE TABLE Registrations (
  ID INT IDENTITY(1,1) PRIMARY KEY,
  StudentName VARCHAR(100),
  EventName VARCHAR(100)
);
GO

CREATE DATABASE pernsheets;

ALTER SEQUENCE sheet_sheet_id_seq RESTART WITH 1;

CREATE TABLE sheet(
	sheet_id SERIAL PRIMARY KEY,
	character_name VARCHAR(100),
	character_class VARCHAR(50),
	level INTEGER,
	race VARCHAR(50),
	background VARCHAR(100),
	bio TEXT
);

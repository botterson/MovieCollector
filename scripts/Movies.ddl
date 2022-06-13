SELECT 'CREATE DATABASE Movies'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'Movies')\gexec

CREATE TABLE IF NOT EXISTS Movies (
    id INT,
    imdbId VARCHAR(20),
    title VARCHAR(100),
    type VARCHAR(100),
    year VARCHAR(4),
    image VARCHAR(255),
    releaseDate DATE,
    runtimeMins VARCHAR(5),
    runtimeStr VARCHAR(10),
    plot VARCHAR(1000),
    awards VARCHAR(255),
    languages VARCHAR(50),
    contentRating VARCHAR(100),
    ratingsId INT,
    posters VARCHAR(255),
    images VARCHAR(255),
    boxOfficeId INT,
    keywords VARCHAR(255),
    tvSeriesInfoId INT
);
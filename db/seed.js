const {
    Pool
} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'catan',
    password: 'bazepodataka',
    port: 5432,
});

const create_players = `DROP TABLE IF EXISTS Player CASCADE; 
    CREATE TABLE Player(
    PlayerId SERIAL,
    Name VARCHAR(30) NOT NULL,
    Color VARCHAR(20) NOT NULL,
    PRIMARY KEY (PlayerId),
    UNIQUE (Name)
);`;

const create_games = `DROP TABLE IF EXISTS Game CASCADE;
    CREATE TABLE Game(
    GameId SERIAL,
    Date DATE NOT NULL,
    WinnerId INT NOT NULL,
    PRIMARY KEY (GameId)
);`; 

const create_playedin = `DROP TABLE IF EXISTS PlayedIn;
    CREATE TABLE PlayedIn(
    Points INT NOT NULL,
    Place INT NOT NULL,
    PlayerId SERIAL,
    GameId SERIAL,
    PRIMARY KEY (PlayerId, GameId),
    FOREIGN KEY (PlayerId) REFERENCES Player(PlayerId),
    FOREIGN KEY (GameId) REFERENCES Game(GameId)
);`;

pool.query(create_players, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'player' table");
});

pool.query(create_games, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'game' table");
});

pool.query(create_playedin, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'playedin' table");
});

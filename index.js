const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080; 
const bp = require('body-parser')

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));


const homeRoute = require('./routes/home.routes');
const playerRoute = require('./routes/player.routes');
const gamesRoute = require('./routes/games.routes');
const leaderboardRoute = require('./routes/leaderboard.routes');

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.use('/', homeRoute);
app.use('/player', playerRoute);
app.use('/games', gamesRoute);
app.use('/leaderboard', leaderboardRoute);



app.listen( PORT, () => {
    console.log( `server started at http://localhost:${ PORT }` );
} );
const express = require('express');
const path = require('path');
const app = express();
const port = 8080; 
const bp = require('body-parser')

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const homeRoute = require('./routes/home.routes');
const playersRoute = require('./routes/players.routes');
const gamesRoute = require('./routes/games.routes');

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.use('/', homeRoute);
app.use('/players', playersRoute);
app.use('/games', gamesRoute);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
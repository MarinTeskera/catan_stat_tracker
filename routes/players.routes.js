const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/', async function (req, res) {

    const players = (await db.query(`SELECT DISTINCT name, AVG(points) AS pointAvg, AVG(place) AS placeAvg, color, COUNT(gameid) AS gamesPlayed
                                        FROM player NATURAL JOIN playedin GROUP BY player.playerId ORDER BY placeAvg, pointAvg DESC`)).rows;


    for (let player of players) {
        console.log(player);
    }

    res.render('players', {
        title: 'Players',
        players: players,
    });
});

router.get('/add', function (req, res) {
    res.render('new_player', {
        title: 'Add Player',
    })
});

router.post('/add', function (req, res) {
    console.log(req.body)
    const name = req.body.name;
    const color = req.body.color;

    db.query(`INSERT INTO player (name, color) VALUES ('${name}', '${color}')`);

    res.redirect('/players');
})

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/', async function (req, res) {

    const players = (await db.query(`SELECT DISTINCT name, AVG(points) AS pointAvg, AVG(place) AS placeAvg, color, COUNT(gameid) AS gamesPlayed
                                        FROM player NATURAL JOIN playedin GROUP BY player.playerId ORDER BY placeAvg, pointAvg DESC`)).rows;


    for (let player of players) {
        console.log(player);
    }

    res.render('leaderboard', {
        title: 'Leaderboard',
        players: players,
    });
});

module.exports = router;
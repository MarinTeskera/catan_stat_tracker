const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async function (req, res) {
    res.render('games', {
        title: 'Games',
        games: (await db.query('SELECT * FROM player NATURAL JOIN game WHERE playerid = winnerid')).rows,
    });
});

router.get('/add', async function (req, res) {
    res.render('new_game', {
        title: 'New Game',
        err: undefined,
    });
});

router.post('/add', async function (req, res) {
    let game_players = [];
    let points = [];
    let winnerId;
    let maxPoints = 0;
    let lastPoints = 0;
    let place = 1;
    let increase = 0;

    players = (await db.query(`SELECT playerid, name FROM player`)).rows;

    for (let i = 1; i <= 6; i++) {
        if (req.body['player' + i + 'Name'] !== '' && req.body['player' + i + 'Points'] !== '') {
            let player = players.filter((p) => p.name === req.body['player' + i + 'Name'])[0]

            if (player === undefined) {
                res.render('new_game', {
                    title: 'New Game',
                    err: `Some players don't exist`,
                });
                return;
            }

            let point = parseInt(req.body['player' + i + 'Points']);
            points.push(point);

            if (lastPoints === 0) {
                lastPoints = point;
            }

            if (point === lastPoints) {
                increase += 1;
            }

            if (point !== lastPoints) {
                place += increase;
                increase = 1;
                lastPoints = point;
            }

            if (point > maxPoints) {
                maxPoints = point;
                winnerId = player.playerid;
            }

            game_players.push({
                player: player,
                points: point,
                place: place,
            });
        }
    }

    await db.query(`INSERT INTO game (date, winnerid) VALUES(CURRENT_DATE, ${winnerId})`);
    const gameid = (await db.query(`SELECT gameid FROM game ORDER BY gameid DESC LIMIT 1`)).rows[0].gameid;
    for (const gp of game_players) {
        await db.query(`INSERT INTO playedIn (playerid, gameid, points, place) 
                        VALUES(${gp.player.playerid}, ${gameid}, ${gp.points}, ${gp.place})`);
    }

    console.log(game_players);

    res.redirect('/leaderboard');

});

module.exports = router;
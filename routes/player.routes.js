const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/', function (req, res) {
    res.render('new_player', {
        title: 'Add Player',
 
    })
});

router.post('/add', function (req, res) {
    console.log(req.body)
    const name = req.body.name;
    const color = req.body.color;

    db.query(`INSERT INTO player (name, color) VALUES ('${name}', '${color}')`);

    res.redirect('/player');
})

module.exports = router;
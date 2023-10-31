//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db.js');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

//Get all comments
app.get('/comments', function (req, res) {
    db.query('SELECT * FROM comment', function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//Get a comment by id
app.get('/comments/:id', function (req, res) {
    db.query('SELECT * FROM comment WHERE id = ?', req.params.id, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//Create a comment
app.post('/comments', function (req, res) {
    db.query('INSERT INTO comment SET ?', req.body, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//Update a comment
app.put('/comments/:id', function (req, res) {
    db.query('UPDATE comment SET ? WHERE id = ?', [req.body, req.params.id], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//Delete a comment
app.delete('/comments/:id', function (req, res) {
    db.query('DELETE FROM comment WHERE id = ?', req.params.id, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//Start server
app.listen(3000, function () {
    console.log('Server is running..');
});
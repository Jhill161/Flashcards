const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name});
    } else {
        res.redirect('/hello');
    };
});

router.get('/cards', (req, res) => {
    res.render('cards');
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello')
});

// if you declare req.cookies.username, you can simply use {name} instead of {name: req.cookies.username}
router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.get('/about', (req, res) => {
    res.send('<h1>About Me</h1>');
});

module.exports = router;
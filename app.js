const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

const mainRoutes = require('./routes')
const cardRoutes = require('./routes/cards')

app.use(mainRoutes);
app.use('/cards', cardRoutes)


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

// .render() method will 'render' the pug html file.
// .redirect() method redirects 
app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name});
    } else {
        res.redirect('/hello');
    };
});

app.get('/cards', (req, res) => {
    res.render('cards', {prompt: "Test", hint: "hint"});
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello')
});

// if you declare req.cookies.username, you can simply use {name} instead of {name: req.cookies.username}
app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

app.get('/about', (req, res) => {
    res.send('<h1>About Me</h1>');
});

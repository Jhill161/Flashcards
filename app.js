const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

// .render() method will 'render' the pug html file.
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Me</h1>');
});
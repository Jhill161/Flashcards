const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

// Random card route
router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashcardId = Math.floor( Math.random() * numberOfCards);
    res.redirect(`/cards/${flashcardId}?side=question`)
});

router.get('/:id', (req, res) => {      // Cards not showing by defaut, not showing when click begin or next card.
    const {side} = req.query;                   // used req.query.side so we can access with '?side=answer'
    const {id}  = req.params;
    if (!side) {
        res.redirect(`/cards/${id}?side=question`)
    };
    const name = req.cookies.username;              // Name not displaying in Cards template ??
    const text = cards[id][side];
    const {hint} = cards[id];
    const templateData = {id, text, name};

    if (side === 'question'){
        templateData.hint = hint
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer'){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    res.render('cards', templateData);
});

module.exports = router;
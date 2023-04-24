const express = require('express');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
	res.redirect('/client'); // w tym momencie robimy przekierowanie na adres /client dlatego że cały czas chcemy mieć w URL nazwę kolekcji, a nie pusty '/'
});

module.exports = homeRouter;

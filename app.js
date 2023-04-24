const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override'); // middlewere który w expressie umożliwia nam dodanie metody delete w formularzu za pomocą atrybutu action
const path = require('path');
const clientRouter = require('./routes/client');
const homeRouter = require('./routes/home');
const { db } = require('./utils/db');

const app = express();

app.use(methodOverride('_method'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
); // robimy to dlatego bo będziemy mieli formuarze
app.use(express.static('public'));

app.engine('.hbs', hbs.engine({ extname: '.hbs' })); // helpers: handlebarsHelpers
app.set('view engine', '.hbs'); // tutaj było handlebars, to jest do metody render
app.set('views', path.join(__dirname, 'views'));

app.use('/', homeRouter);
app.use('/client', clientRouter);

app.listen(3000, 'localhost', () => {
	console.log('Listening on http://localhost:3000');
});

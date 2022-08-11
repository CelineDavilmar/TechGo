
//const routes = require('./controllers/');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const express = require('express');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on 3001'));
});

/* router.get('/', (req, res) => {
    res.render('home', { loggedIn: true });
});

app.get('/', function (req, res) {
    res.render('main', { layout: 'index' });
});
app.get('/', function (req, res) {
    res.render('main');
});

app.get('/starter', function (req, res) {
    res.render('starter');
});

app.get('/login', function (req, res) {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

app.get('/homepage', function (req, res) {
    res.render('homepage', { loggedIn: true })
});
 */

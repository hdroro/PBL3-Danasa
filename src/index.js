const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const session = require('express-session')

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
db.connect;

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));

app.use(session({secret: 'Your_Secret_Key', resave: true, saveUninitialized: true}))
// app.use(express.json);

//HTTP logger
// app.use(morgan('combined'));

//Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));


route(app);


app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})
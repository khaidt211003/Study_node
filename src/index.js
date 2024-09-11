const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
// const morgan = require('morgan');
const { engine } = require ('express-handlebars');
const SortMiddlewares = require('./app/middlewares/SortMiddlewares');
const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: require('./helper/handlebar'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(express.json());
app.use(methodOverride('_method'))
app.use(SortMiddlewares);
const route = require('./routes');
// app.use(morgan('combined'));
route(app);

const db = require('./config/db');

// Connect to DB
db.connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
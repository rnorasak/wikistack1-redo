const morgan = require('morgan');
const express = require('express');
const app = express();
const layout = require('./views/layout');
const { db } = require('./models');
const models = require('./models');
const userRouter = require('./routes/user');
const wikiRouter = require('./routes/wiki');

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

const port = 3000;

async function sync() {
  await models.db.sync({ force: true });

  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

sync();

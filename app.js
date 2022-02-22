const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user');
const { cardRouter } = require('./routes/card');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb ', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '620b670d2a2d723043cb0b18',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

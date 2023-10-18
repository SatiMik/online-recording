const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = require('./routes/userRouter');
const recordsRouter = require('./routes/recordsAdminRouter');
const mastersRouter = require('./routes/mastersAdminRouter');
const servicesRouter = require('./routes/servicesAdminRouter');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET ?? 'test',
    resave: true,
    store: new FileStore(),
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    },
  }),
);

app.use('/api/user', userRouter);
app.use('/api/records', recordsRouter);
app.use('/api/masters', mastersRouter);
app.use('/api/services', servicesRouter);

app.listen(PORT, () => console.log(`Started on port ${PORT}`));

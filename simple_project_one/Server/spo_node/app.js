const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

dotenv.config();
const app = express();
app.set('port', process.env.NODE_ENV !== 'production'? 8000:process.env.PORT);

app.use(morgan(process.env.NODE_ENV !== 'production'? 'dev':'combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true,}));
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//   },
// }));

//route+func
const imgPexelsRouter = require('./routes/r_pexels');
const funcPexels = require('./functions/f_pexels');
const signsRouter = require('./routes/r_signs');
const chattingRouter = require('./routes/r_chatting');

//api
app.use('/pexels', imgPexelsRouter);
app.use('/signs', signsRouter);
app.use('/chatting', chattingRouter);

app.get('/', (req, res)=>{
  res.end("who are you?");
});

//loop func
funcPexels.getPexelsImg();

//error
app.use((req, res, next)=>{
  const error = new Error(`${req.method} ${req.url} no router.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production'? err:{};
  res.status(err.status || 500);
  res.json({statusCode: res.statusCode, errMessage:err.message});
});

module.exports = app;

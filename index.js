const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const errorHandlerMiddleware = require('./errors/errorHandlerMiddleware');

//db
const routerScores = require('./routes/scores');

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//midleware
app.use(express.json());

app.use('/scores/api', routerScores);

app.use(errorHandlerMiddleware);

//server start
const startServer = async () => {
  try {
    let PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log('server on port: ' + PORT);
    });
  } catch (error) {
    console.log(`There is a problem with a server:${error}`);
  }
};

startServer();

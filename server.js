const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const mysql = require('mysql');
const HPP = require('hpp');
const cors = require('cors');

const routeHandler = require('./routes');
const {
  createTables
} = require('./models/repository/index');
const {
  ApiError,
  InternalError,
  NotFoundError,
} = require('./utilities/core/ApiError');

module.exports = (config) => {
  const app = express();

  const corsOption = {
    origin: true,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token'],
  };

  const {
    db
  } = config;
  const con = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
  });

  con.connect(async function (err) {
    if (err) {
      config.logger.info(`Couldn't connect to the database\n${err}`);
      process.exit();
    }
    config.logger.info('Successfully connected to the Database');
    await createTables(con, config.logger);
  });

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(helmet());
  app.use(cors(corsOption));

  // prevent parameter pollution
  app.use(HPP());
  app.use(morgan('dev'));
  app.use(express.json({
    limit: '20mb',
    extended: true
  }));
  app.use(express.urlencoded({
    limit: '20mb',
    extended: true
  }));

  /**
   * Adds application routes middleware from the routes index which groups all routes together
   */
  app.use('/v1', routeHandler);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(new NotFoundError('Resource Not Found'));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // Checks if err is thrown by us and handled to the ApiError Class, if not we throw and handle an internal server error
    if (err instanceof ApiError) {
      ApiError.handle(err, res);
    } else {
      ApiError.handle(new InternalError(err), res);
    }
    // log error to the console for debugging purpose
    config.logger.error(`${err} app----`);
    console.error(err);
  });

  global.con = con;
  return app;
};
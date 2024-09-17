import express from 'express';
import colors from 'colors';
import swaggerUI from 'swagger-ui-express';
import cors, {CorsOptions} from 'cors';
import morgan from 'morgan';
import swaggerSpec, {swaggerUIOptions} from './config/swagger.js';
import router from './router.js';
import db from './config/db.js';

async function connectDb() {
  try {
    await db.authenticate();
    db.sync();
    console.log(
      colors.green.bold('Connection has been established successfully.')
    );
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold('Unable to connect to the database:'));
  }
}

connectDb();
const server = express();

//*CORS

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    console.log(origin); //* origin is the request origin (frontend /client)
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan('dev'));

server.use('/api/products', router);

server.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUIOptions)
);

export default server;

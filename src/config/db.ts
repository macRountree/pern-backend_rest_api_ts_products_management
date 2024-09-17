import {Sequelize} from 'sequelize-typescript';

import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import Product from '../models/Product.model';

dotenv.config();

// console.log();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [join(__dirname + '/../models/**/*.ts')],
  logging: false,
});
db.addModels([Product]);

export default db;

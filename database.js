import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

let user = process.env.USER;
let password = process.env.PASSWORD;
let host = process.env.HOST;
let port = process.env.PORT;
let database = process.env.DATABASE;

export const connection = new Pool({
    user, password, host, port, database
});
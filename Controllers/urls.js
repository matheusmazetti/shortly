import { nanoid } from 'nanoid';
import { connection } from '../database.js';

export const short = async (req, res) => {
    let body = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    try{
        let verify = await connection.query("SELECT * FROM sessions WHERE token = $1", [token]);
        if(verify.rows.length !== 0){
            let short = nanoid();
            await connection.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)', [verify.rows[0].userId, body.url, short]);
            res.status(201).send({shortUrl: short});
        } else {
            res.sendStatus(401);
        }
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};
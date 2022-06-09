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

export const deleteShort = async (req, res) => {
    let id = req.params.id;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    try{
        let verify = await connection.query("SELECT * FROM sessions WHERE token = $1", [token])
        if(verify.rows.length !== 0){
            let shorten = await connection.query("SELECT * FROM urls WHERE id = $1", [id]);
            if(shorten.rows.length === 0){
                res.sendStatus(404);
            } else if(shorten.rows[0].userId !== verify.rows[0].userId){
                res.sendStatus(401);
            } else {
                await connection.query("DELETE FROM urls WHERE id = $1", [id]);
                res.sendStatus(204);
            }
        } else {
            res.sendStatus(401);
        }
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};

export const getShort = async (req, res) => {
    let id = req.params.id;
    try{
        let shorten = await connection.query("SELECT * FROM urls WHERE id = $1", [id]);
        if(shorten.rows.length !== 0){
            let body = {
                id: shorten.rows[0].id,
                shortUrl: shorten.rows[0].shortUrl,
                url: shorten.rows[0].url
            };
            res.status(200).send(body);
        } else {
            res.sendStatus(404);
        }
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};

export const openShort = async (req, res) => {
    let short = req.params.shortUrl;
    try{
        let verify = await connection.query('SELECT * FROM urls WHERE "shortUrl" = $1', [short]);
        if(verify.rows.length !== 0){
            let views = verify.rows[0].visitCount + 1;
            await connection.query('UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2', [views, short]);
            res.redirect(verify.rows[0].url);
        } else {
            res.sendStatus(404);
        }
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};
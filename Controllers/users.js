import { connection } from "../database.js";

export const user = async (req, res) => {
    let id = req.params.id;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    try{
        let verify = await connection.query('SELECT * FROM sessions WHERE token = $1', [token]);
        if(verify.rows.length !== 0 && verify.rows[0].userId == id){
            let firstPart = await connection.query(`
                SELECT users.id, users.name, SUM(urls."visitCount") AS visitCount
                FROM users
                JOIN urls
                ON users.id = urls."userId"
                WHERE users.id = $1
                GROUP BY users.id`, [id]);
            let secondPart = await connection.query(`
                SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" 
                FROM urls WHERE urls."userId" = $1`, [id]);
            let obj = {
                id: id,
                name: firstPart.rows[0].name,
                visitCount: firstPart.rows[0].visitcount,
                shortenedUrls: secondPart.rows  
            }
            res.status(200).send(obj);
        } else {
            res.sendStatus(401);
        }
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};

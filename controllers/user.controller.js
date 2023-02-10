const jwt = require('jsonwebtoken')
const db = require("../db")
const sha1 = require('sha1');

const generateJwt = (senderId, mail, admin) => {
    return jwt.sign(
        {senderId, mail, admin},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async createUser(req, res){
        const {admin} = req.user;
        const {mail, password, name, surname, rights} = req.body;

        if(!admin) return res.json({ 'status': 'Error', 'code': 1 });
        
        const newUser = (await db.query('INSERT INTO users(mail, password, name, surname, admin) values ($1, $2, $3, $4, $5) RETURNING *', [mail, sha1(password), name, surname, rights])).rows[0];
        return res.json({ 'status': 'Success', 'data': newUser });
    }

    async authUser(req, res){
        const {mail, password} = req.query;

        const user = (await db.query('SELECT * FROM users where mail = $1', [mail])).rows[0];

        if(!user) return res.json({ 'status': 'Error', 'code': 1 }); 
        if(user.password != sha1(password)) return res.json({ 'status': 'Error', 'code': 1 });

        return  res.json({ 'status': 'Success', 'token': generateJwt(user.id, user.mail, user.admin) });
    }

    async authToken(req, res){
        const {senderId} = req.user;

        const user = (await db.query('SELECT * FROM users where id = $1', [senderId])).rows[0];

        return res.json({ 'status': 'Success', 'token': generateJwt(user.id, user.mail, user.admin) });
    }

    async getMyInfo(req, res){
        const {senderId} = req.user;

        const user = (await db.query('SELECT * FROM users where id = $1', [senderId])).rows[0];
        return res.json({ 'status': 'Success', 'data': user });
    }

    async getUser(req, res){
        const {admin} = req.user;
        const id = req.params.id;

        if(!admin) return res.json({ 'status': 'Error', 'code': 1 });

        const user = (await db.query('SELECT * FROM users where id = $1', [id])).rows[0];
        return res.json({ 'status': 'Success', 'data': user });
    }

    async getUsers(req, res){
        const {admin} = req.user;

        if(!admin) return res.json({ 'status': 'Error', 'code': 1 });

        const users = (await db.query('SELECT * FROM users')).rows;
        return res.json({ 'status': 'Success', 'data': users });
    }

    async updateUser(req, res){
        const {admin} = req.user;
        const id = req.params.id;
        const {mail, name, surname} = req.body;

        if(!admin) return res.json({ 'status': 'Error', 'code': 1 });

        const user = (await db.query('UPDATE users set mail = $1, name = $2, surname = $3 where id = $4 RETURNING *', [mail, name, surname, id])).rows[0];

        return res.json({ 'status': 'Success', 'data': user });
    }

    async deleteUser(req, res){
        const {admin} = req.user;
        const id = req.params.id;

        if(!admin) return res.json({ 'status': 'Error', 'code': 1 });

        const user = (await db.query('DELETE FROM users where id = $1', [id])).rows[0];
        return res.json({ 'status': 'Success' });
    }
}

module.exports = new UserController();
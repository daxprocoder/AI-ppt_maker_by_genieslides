const app = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user');


app.get('/', (req, res) => {

    if(req.session.user) {
        return res.redirect('/dashboard');
    }

    if(req.session.tempuser) {
        req.session.tempuser = null;
    }

    return res.sendFile('login.html', { root: 'views' });
});

app.post('/', async(req, res) => {

    try {
        if(req.session.user) {
            return res.redirect('/dashboard');
        }

        if(req.session.tempuser) {
            req.session.tempuser = null;
        }

        const body = await req.body;
        const { email, password } = body;

        if(!email || !password) {
            return res.status(400).json({error: 'Please enter all fields'});
        }

        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(400).json({error: 'User does not exist'});
        }

        if(user.password !== password) {
            return res.status(400).json({error: 'Invalid password'});
        }

        req.session.user = user;

        return res.redirect('/dashboard');

    } catch (error) {
        return res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = app;
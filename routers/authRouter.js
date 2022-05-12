const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

const {
    authenticateUser,
} = require('../controllers/authControllers');


authRouter.get('/', authenticateUser, (req, res, next) => {
    res.render('index', { title: 'Express' });
});

authRouter.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'Login'
    })
});

authRouter.get('/login/google', 
    passport.authenticate('google', { scope: ['profile']})
);

authRouter.get('/login/google/callback',
    passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/'
}));

module.exports = authRouter;
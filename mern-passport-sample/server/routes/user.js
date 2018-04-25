const express = require('express');
const User = require('../database/models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');q 




const router = express.Router();

// /* GET user profile. */
router.get('/', function(req, res, next) {
    res.send(req.user);
});

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})


router.post('/login', (req, res, next) => {
        // console.log('routes/user.js, login, req.body: ');
        console.log(req.body)

        // next()
    // },
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(info);
        if (err || !user){
            return res.status(400).json({
                message : 'Something went wrong',
                user    :  user


            });
            
        }

        req.login(user, { session: false }, (err) => {
            if(err){
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
            return res.json({user, token});
        })
         
       
    })(req, res)
    // (req, res) => {
    //     console.log('logged in', req.user);
    //     var userInfo = {
    //         username: req.user.username
    //     };
    //     res.send(userInfo);
    // }
}); 


router.get('/', (req, res, next) => {
    console.log('user!')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router;

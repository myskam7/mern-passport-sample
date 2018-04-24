const express = require('express');
const router = express.Router();

// router.post('/', (req, res) => {
//     console.log('user signup');

//     const { username, password } = req.body
//     // ADD VALIDATION
//     User.findOne({ username: username }, (err, user) => {
//         if (err) {
//             console.log('User.js post error: ', err)
//         } else if (user) {
//             res.json({
//                 error: `Sorry, already a user with the username: ${username}`
//             })
//         }
//         else {
//             const newUser = new User({
//                 username: username,
//                 password: password
//             })
//             newUser.save((err, savedUser) => {
//                 if (err) return res.json(err)
//                 res.json(savedUser)
//             })
//         }
//     })
// })

/* GET user profile. */
router.get('/', function(req, res, next) {
    res.send(req.user);
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
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// /* GET user profile. */
// router.get('/profile', function(req, res, next) {
//     res.send(req.user);
// });

module.exports = router;




// const express = require('express');
// const router  = express.Router();
// const User = require('../database/models/user');

// const jwt      = require('jsonwebtoken');
// const passport = require('passport');

// /* GET user profile. */
// router.get('/profile', function(req, res, next) {
//     res.send(req.user);
// });

// router.post('/', (req, res, next) => {
//     res.send('respond with resource');
//     console.log('user signup');

//     const { username, password } = req.body
//     // ADD VALIDATION
//     User.findOne({ username: username }, (err, user) => {
//         if (err) {
//             console.log('User.js post error: ', err)
//         } else if (user) {
//             res.json({
//                 error: `Sorry, already a user with the username: ${username}`
//             })
//         }
//         else {
//             const newUser = new User({
//                 username: username,
//                 password: password
//             })
//             newUser.save((err, savedUser) => {
//                 if (err) return res.json(err)
//                 res.json(savedUser)
//             })
//         }
//     })
// })



// router.get('/', (req, res, next) => {
//     console.log('user!')
//     console.log(req.user)
//     if (req.user) {
//         res.json({ user: req.user })
//     } else {
//         res.json({ user: null })
//     }
// })

// router.post('/logout', (req, res) => {
//     if (req.user) {
//         req.logout()
//         res.send({ msg: 'logging out' })
//     } else {
//         res.send({ msg: 'no user to log out' })
//     }
// })

// /* POST login. */
// router.post('/login', function (req, res, next) {

//     passport.authenticate('local', {session: false}, (err, user, info) => {
//         console.log(err);
//         if (err || !user) {
//             return res.status(400).json({
//                 message: info ? info.message : 'Login failed',
//                 user   : user
//             });
//         }

//         req.login(user, {session: false}, (err) => {
//             if (err) {
//                 res.send(err);
//             }

//             const token = jwt.sign(user, 'your_jwt_secret');

//             return res.json({user, token});
//         });
//     })
//     (req, res);

// });

// module.exports = router;
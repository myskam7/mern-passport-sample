// const passport = require('passport')
// const JwtStrategy = require('./jwtStrategy')
// const LocalStrategy = require('./localStrategy')
const User = require('../database/models/user')
const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'username'

    },
    function (username, password, done) {

        //Assume there is a DB module pproviding a global UserModel
        return User.findOne({username: username})
            .then(user => {
                if (!user) {
						return done(null, false, { message: 'Incorrect username' })
					}
				if (!user.checkPassword(password)) {
					return done(null, false, { message: 'Incorrect password' })
					}
					

                return done(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return done(err);
            });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, done) {

        //find the user in db if needed
        return User.findOneById(jwtPayload._id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
));







// // called on login, saves the id to session req.session.passport.user = {id:'..'}
// passport.serializeUser((user, done) => {
// 	console.log('*** serializeUser called, user: ')
// 	console.log(user) // the whole raw user object!
// 	console.log('---------')
// 	done(null, { _id: user._id })
// })

// // user object attaches to the request as req.user
// passport.deserializeUser((id, done) => {
// 	console.log('DeserializeUser called')
// 	User.findOne(
// 		{ _id: id },
// 		'username',
// 		(err, user) => {
// 			console.log('*** Deserialize user, user:')
// 			console.log(user)
// 			console.log('--------------')
// 			done(null, user)
// 		}
// 	)
// })

//  Use Strategies 
// passport.use(JWTStrategy)

module.exports = passport
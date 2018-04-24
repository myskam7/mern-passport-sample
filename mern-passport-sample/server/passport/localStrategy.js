const User = require('../database/models/user');

const passport = require('passport');

const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy; 

passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
},
function(username, password, cb){
	return User.findOne({username, password})
	.then(user => {
		if (!user) {
			return cb(null, false, {message: 'Incorrect email or password.'});
		}

		return cb(null, user, {
			message: 'Logged In Successfully'
		});
	})
	.catch(err => {
		return cb(err);
	});
}
));

passport.use(new JWTStrategy({
	jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey    : 'your_jwt_secret'
},
function(jwtPayload, cb){
	return User.findOneById(jwtPayload.id)
	.then(user => {
		return cb(null, user);
	})
	.catch(err => {
		return cb(err)
	})
}

))






// const User = require('../database/models/user');

// const LocalStrategy = require('passport-local').Strategy


// const strategy = new LocalStrategy(
// 	{
// 		usernameField: 'username' // not necessary, DEFAULT
// 	},
// 	function(username, password, done) {
// 		User.findOne({ username: username }, (err, user) => {
// 			if (err) {
// 				return done(err)
// 			}
// 			if (!user) {
// 				return done(null, false, { message: 'Incorrect username' })
// 			}
// 			if (!user.checkPassword(password)) {
// 				return done(null, false, { message: 'Incorrect password' })
// 			}
// 			return done(null, user)
// 		})
// 	}
// )

// module.exports = strategy;




const User = require('../database/models/user');
const server = require('../server');
//passport-jwt
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; 

const jwtS = function(passport){
// const strategy = new JwtStrategy()
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'server.secret';

opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';


passport.use(new JwtStrategy(opts, function(username, password, done){
    console.log(req);
	User.findOne({ username: username }, function (err, user) {
					if (err) {
						return done(err)
					}
					if (!user) {
						return done(null, false, { message: 'Incorrect username' })
					}
					if (!user.checkPassword(password)) {
						return done(null, false, { message: 'Incorrect password' })
					}
					return done(null, user)
					
			})
				
	 }
    )
    
)
}
module.exports = jwtS;

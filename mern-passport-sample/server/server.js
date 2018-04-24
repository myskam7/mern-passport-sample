const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./database') 
const passport = require('passport');





// Route requires
const user = require('./routes/user');
const auth = require('./routes/auth');

require('./passport/index');


const app = express()

const PORT = 8080;

//middleware
app.use(morgan('dev'))
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())

//Sessions
app.use(
    session({
        secret: 'fsad7f9sdf97safa98', 
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false 

        })
    )

    //passport
    app.use(passport.initialize()) 
    app.use(passport.session()) //calls the user
    // app.use('/', index)


    app.use('/user', user)
    app.use('/auth', passport.authenticate('jwt', {session: false}), user);
    
    //routes
    

    //starts the server
    app.listen(PORT, () => {
        console.log(`App listening to PORT: ${PORT}`);
    })

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const dbConnection = require('./database') 
const passport = require('./passport');

const app = express()

// Route requires
const user = require('./routes/user')

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
        secret: 'balloonz', 
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false 

        })
    )

    //passport
    app.use(passport.initialize()) 
    app.use(passport.session()) //calls the user
    


    //routes
    app.use('/user', user)

    //starts the server
    app.listen(PORT, () => {
        console.log(`App listening to PORT: ${PORT}`);
    })

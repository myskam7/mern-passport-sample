const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


mongoose.promise = Promise;

//userSchema defined
const userSchema = new Schema({

    username: {type: String, unique: false, required: false},
    password: {type: String, unique: false, required: false}
});

//schema methods defined
userSchema.methods = {
    checkPassword: (inputPassword) => {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

//hooks for pre-saving
userSchema.pre('save', (next) => {
    if(!this.password) {
        console.log('NO PASSWORD')

        next()
    
    } else {
        this.password = this.hashPassword(this.password)

        console.log('password is in pre save')

        next()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User; 
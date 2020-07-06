/**
 * This module exports `user` mongoose model for database
 */

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    }
})

// user-defined method on `User` model to find user account
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })

    if(!user) {
        return { error: 'invalid credentials!' } // user not found
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return { error: 'invalid credentials!' } // incorrect password
    }

    return user
}

// overwriting `toJSON` method to delete sensitive data from response
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    // deleting sensitive data from user obj.
    delete userObject.password

    return userObject
}

// Mongoose MIDDLEWARE to hash plain text password before saving it into database
userSchema.pre('save', async function (next) {
    const user = this

    // hashing password
    if(user.isModified('password')) { // `isModified('field')` will return true if field is modified while updating data
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

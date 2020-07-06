/**
 * This module exports `Vendor` mongoose model for database
 */

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const vendorSchema = mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
    },
    items: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            required: true
        }
    }]
})

vendorSchema.methods.toJSON = function () {
    const vendor = this
    
    const vendorObject = vendor.toObject()

    // deleting sensitive data from user obj.
    delete vendorObject.password

    return vendorObject
}

// user-defined method on Vendor model to find account
vendorSchema.statics.findByCredentials = async (mobile, password) => {
    const vendor = await Vendor.findOne({ mobile })

    if(!vendor) {
        return { error: 'invalid credentials!' } // user not found
    }

    const isMatch = await bcrypt.compare(password, vendor.password)

    if(!isMatch) {
        return { error: 'invalid credentials!' } // password not matched
    }

    return vendor
}

// hashing password before saving into database
vendorSchema.pre('save', async function (next) {
    const resaurant = this

    // hashing password
    if(resaurant.isModified('password')) { // `isModified('field')` will return true if field is modified while updating data
        resaurant.password = await bcrypt.hash(resaurant.password, 8)
    }

    next()
})

const Vendor = mongoose.model('Vendor', vendorSchema)

module.exports = Vendor

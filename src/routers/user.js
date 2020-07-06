/**
 * separate route for `User` collection related routes
 */

const express = require('express')

// Models
const User = require('../models/user')

const router = new express.Router()

//
// user account related routes
//

// signup user
router.post('/user/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        res.status(201).send(user)
    } catch(error) {
        res.status(400).send(error)
    }
})

// login user
router.post('/user/login', async (req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.username, req.body.password)

        res.status(200).send(user)
    } catch(error) {
        res.status(401).send(error)
    }
})

module.exports = router

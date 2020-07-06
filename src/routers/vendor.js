/**
 * separate route for `Vendor` collection related routes
 */

const express = require('express')

// Models
const Vendor = require('../models/vendor')

const router = new express.Router()

//
// Basic account routes
//

// Route for signup vendor
router.post('/vendor/signup', async (req, res) => {
    const vendor = new Vendor(req.body)

    try {
        await vendor.save()

        res.status(201).send(vendor)
    } catch (error) {
        res.status(400).send(error)
    }
})


// Route for log-in vendor
router.post('/vendor/login', async (req, res) => {
    try {
        
        const vendor = await Vendor.findByCredentials(req.body.mobile, req.body.password)
        
        res.status(200).send(vendor)
    } catch(error) {
        res.status(400).send(error)
    }
})

//
// Products related routes
//

// see products list by all vendors
router.get('/vendor/list', async (req, res) => {
    try {
        const vendors = await Vendor.find({})
        const items = []

        vendors.forEach((vendor) => {
            vendor.items.forEach((item) => {
                items.push(item)
            })
        })

        res.status(200).send({ status: 1, items })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router

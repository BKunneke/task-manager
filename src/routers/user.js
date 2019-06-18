const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).send(users)
    } catch (e) {
        return res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    const user = await User.findById(_id)
    try {
        if (!user) {
            return res.status(404).send()
        }
        return res.send(user)
    } catch (e) {
        return res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    // Take the body and convert it to an array of keys
    const updates = Object.keys(req.body)
    // Define a list of allowed keys to update
    const allowedUpdates = ['name', 'email', 'password', 'age']
    // The every operation will iterate the params sent in, and if any of them
    // return fales, the every operation will return false
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()
        
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router

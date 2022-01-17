const { Router } = require('express')
const Users = require('../models/Users')
const router = Router()
const authonticateToken = require('../services/checkAuth')

router.get('/users', authonticateToken ,async (req, res) => {
    const users = await Users.find({})
    const accessToken = req.accessToken
    res.send({users,accessToken})
})


module.exports = router
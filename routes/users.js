const { Router } = require('express')
const Users = require('../models/Users')
const router = Router()
const authonticateToken = require('../services/checkAuth')

router.get('/users', authonticateToken ,async (req, res) => {
    try{
        const users = await Users.find()
        const accessToken = req.accessToken
        res.json({users:await users,accessToken})
    }catch(e){
        console.log('users page',e.message);
    }
})


module.exports = router
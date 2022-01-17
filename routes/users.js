const { Router } = require('express')
const Users = require('../models/Users')
const router = Router()
const authonticateToken = require('../services/checkAuth')

router.get('/users', authonticateToken ,async (req, res) => {
    try{
    const users = await Users.find({})
    res.json({users:await users})
    }catch(e){
        console.log('users fetch error');
    }
})


module.exports = router
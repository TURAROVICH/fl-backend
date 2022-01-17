const { Router } = require('express')
const Users = require('../models/Users')
const router = Router()
const authonticateToken = require('../services/checkAuth')

router.get('/users', authonticateToken ,async (req, res) => {
    try{
    // const users = await Users.find({})
    // const accessToken = re
    console.log(req.body,req, '----------------------');
    res.json({users:['hello']})
    }catch(e){
        console.log('users fetch error');
    }
})


module.exports = router
const { Router } = require('express')
const Users = require('../models/Users')
const router = Router()
const jwt = require('jsonwebtoken')
const {generateHash,compareHash} = require('../services/bcrypt') 
const ACCES_TOKEN = process.env.ACCESS_TOKEN
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const accesTokenTime = 60 * 30

router.post('/login', async (req, res) => {
  const {password,email} = req.body
  console.log(password,email);
  if(!password) return res.status(400).json({message:'Поле password пустой'});
  if(!email) return res.status(400).json({message:'Поле email пустой'});
  let hashPassword = await generateHash(password)
  const user = await Users.findOne({email:email})
  if(!user){
    return res.status(404).json({message:'Такой email нету в DB'});
  }
  const match = await compareHash(password,user.password)
  if(!match){
    return res.status(403).json({message:'Не пралильный пароль'});
  }
  const accessToken = jwt.sign({password,email},ACCES_TOKEN,{expiresIn: accesTokenTime + 's'})
  const refreshToken = jwt.sign({password:await hashPassword,email},REFRESH_TOKEN)
  res.cookie('REFRESH_TOKEN', refreshToken, { expires: new Date(Date.now() + (60 * 60 * 24 * 30))});
  return res.json({accessToken,user})
  
})


router.post('/register', async (req, res) => {
  const {email,password,name} = req.body
  if(!password) return res.status(400).json({message:'Поле password пустой'});
  if(!email) return res.status(400).json({message:'Поле email пустой'});
  if(!name) return res.status(400).json({message:'Поле name пустой'});
  
  let hashPassword = await generateHash(password)
  const userHaveInDB = await Users.findOne({email:email})
  if(!!userHaveInDB){
    return res.status(403).json({message:'Вы уже зарегистрированы'});
  }
  const accessToken = jwt.sign({password:await hashPassword,email},ACCES_TOKEN,{expiresIn: accesTokenTime + 's'})
  const refreshToken = jwt.sign({password:await hashPassword,email},REFRESH_TOKEN)
  res.cookie('REFRESH_TOKEN', refreshToken,{maxAge: (60 * 60 * 24 * 30)});
  const user = new Users({password:await hashPassword,email:email,refreshToken:refreshToken,name})
  res.send({accessToken,user});
  return await user.save()
})



module.exports = router

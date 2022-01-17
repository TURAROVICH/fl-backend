const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const cors = require('cors')
dotenv.config()


const PORT = process.env.PORT || 3000
const URI = process.env.MONGODB_URI;
const app = express()


const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
 
app.use(cors({credentials: true, origin: 'https://fl-frontend.vercel.app/'}));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://fl-frontend.vercel.app");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
});


app.use(cookieParser());
app.use(express.json())
app.use(authRoutes)
app.use(usersRoutes)


async function start() {
  try {
    await mongoose.connect( URI,
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log("mongo connect error" , URI)
  }
}

start()

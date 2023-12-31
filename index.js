require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorMiddleware')
const path = require('path')

const dbInstance = require('./dbinstance') //< �������!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const PORT = process.env.PORT || 5000

const app = express()
app.use(require('morgan')('dev'))
app.use(cors())
app.use(express.json()) 
app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => 
{
  try 
  {
    await sequelize.authenticate() 
    await sequelize.sync(/*{ alter: true }*/) 
    dbInstance() 
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e)
  {
    console.log(e)  
  }
}

start() 
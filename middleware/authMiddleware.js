const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const ApiError = require('../error/ApiError');

module.exports = async function(req, res, next)
{
  if(req.method === "OPTIONS")
  {
    next()
  }
  try
  {
    const token = req.headers.authorization.split(' ')[1] // Bearer hbrjdbdnbjn
    console.log(token)
    if(!token)
    {
      return res.status(401).json({message: "Не авторизован"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await User.findOne({where:{ id: decoded.id }});
    console.log(req.user)
    if(!req.user)
      return res.status(401).json({message: "Не авторизован"}) 
    next()
  } catch(e)
  {
    console.log("CATCH!!!");
    res.status(401).json({message: "Не авторизован"}) 
  }
};
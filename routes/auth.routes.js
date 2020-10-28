const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User') // model User, usually models are named with Caption Letter
const router = Router()

// Endpoints
// /api/auth/register
router.post(
  '/register', 
  [
    check('email', 'Email is not correct').isEmail(),
    check('password', 'Minimum length of password is 6 symbols').isLength( this.options = {min: 6} )
  ],
  async (req, res) => {
  try {
    //console.log("Body: ", req.body) // What is in body? // LOG
    /*
      Main validation has to be done on Server
      npm install express-validator
    */
    const errors = validationResult(req)
    //console.log("errors.message ", errors) // LOG
    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Uncorrect data for registration'
      })
    }
    
    const {email, password} = req.body // is being sent from FrontEnd
    const candidate = await User.findOne({email: email})
    if (candidate) {
      return res.status(400).json({message: 'The user already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password: hashedPassword})
    await user.save()
    res.status(201).json({message: "User was created successfully" })

  } catch (error) {
    //console.log("We are here: " + error.message) // LOG
    res.status(500).json( { message: 'Something got wrong, try again' })
  }
})

// /api/auth/login
router.post(
  '/login', 
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter correct password').exists()
  ],
  async (req, res) => {
   try {
    /*
      Main validation has to be done on Server
      npm install express-validator
    */
    const erorrs = validationResult(req)
    if(!erorrs.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Uncorrect data for authorization'
      })
    }
    
    // User authorization process
    const {email, password} = req.body
    
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({message: 'User was not found'})
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({message: 'Incorrect password, try it again'})
    }

    // 
    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })

  } catch (error) {
    res.status(500).json( { message: 'Something got wrong, try again' })
  }
})

module.exports = router;
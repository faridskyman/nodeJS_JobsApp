const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs');

const register = async (req, res) =>{
    //validation of field altho in model too there is a validaton handle my mongoose.
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        throw new BadRequestError('pls provide name, email or password');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const tempUser = { name, email, password: hashedPassword }

    const user = await User.create({ ...tempUser });
    res.status(StatusCodes.CREATED).json({ user });
    
}

const login = async (req, res) =>{
    res.send('login user');
}

module.exports = { register, login }

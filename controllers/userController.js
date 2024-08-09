const User = require('../models/Usermodel');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const  dotenv = require('dotenv');
dotenv.config();

exports.SignUp =async (req, res, next) => {
       
    try {
        // Save the user to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role
        });

        await newUser.save(); // Save the user

        // Create the JWT payload as a plain object
        
        
        const userPayload = { 
            
            username: newUser.username, 
            role: newUser.role 
        };

            const accessToken = jwt.sign(userPayload, process.env.SECRET_TOKEN_ACCESS, { expiresIn: '10s' });
            const refreshToken = jwt.sign(userPayload,process.env.REFRESH_TOKEN_SECRET);
            res.status(200).json({ message: 'User created successfully', accessToken, refreshToken });        
             } catch (err) {
            console.error(err);
            res.status(400).send('Error during signUp');
        }
    };

    exports.login = async (req, res, next) => {
        const { username, password } = req.body;
    
        try {
            // Find the user in the database by username
            const findUser = await User.findOne({ username: username });
    
            if (!findUser) {
                return res.status(401).send('Invalid username or password');
            }
            
            const isPasswordValid = await bcrypt.compare(password, findUser.password);
    
            if (!isPasswordValid) {
                return res.status(401).send('Invalid username or password');
            }
    
            
            const userPayload = {
                username: findUser.username,
                role: findUser.role
            };
    
            
            const accessToken = jwt.sign(userPayload, process.env.SECRET_TOKEN_ACCESS, { expiresIn: '10s' });
            const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET);
    
            
            res.json({ accessToken, refreshToken });
        } catch (err) {
            console.error('Error during login:', err);
            res.status(500).send('Error during login');
        }
    };


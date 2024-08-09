const jwt = require ('jsonwebtoken');
const  dotenv = require('dotenv');

dotenv.config();

exports.auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN_ACCESS, (err, user) => { 
            if (err) {
                return res.status(403).send('Token is invalid or expired');
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Access Denied: No Token Provided!');
    }
};

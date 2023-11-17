const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('Authorization');
   
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(token === jwt.sign(decoded, process.env.JWT_SECRET)){
            next()
            return
        }
        res.json({ message: 'Token is not valid' })
       
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}



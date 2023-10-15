const jwt = require('jsonwebtoken');

fetchProfessional = (req, res, next) => {
    // Get the user from jwt token and add id to req object.
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error: "Please Authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.professional = data.professional; 
        next();
    } catch (error) {
        res.status(401).send({error: "Please Authenticate using a valid token"});
    }
}

module.exports = fetchProfessional;
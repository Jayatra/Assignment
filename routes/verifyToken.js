const jwt = require('jsonwebtoken');

 const admin =  (req,res,next)=>{
    const token = req.header('auth-token-admin');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token,process.env.TOKEN);
        req.adminData = verified;
        next();
    }catch(err){
        res.status(400).send(err);
    }
} 

const user = (req,res,next)=>{
    const token = req.header('auth-token-user');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token,process.env.TOKEN);
        req.userData = verified;
        next();
    }catch(err){
        res.status(400).send(err);
    }
}

module.exports  = { admin,user};

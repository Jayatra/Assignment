const router = require('express').Router();
const roles = require('../model/roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation , loginValidation } = require('../validation');

router.post('/adminCreated', async (req, res) => {

    //lets validate data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in db
    const emailExist = await roles.admin.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('email already exists');
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPasswordA = await bcrypt.hash(req.body.password, salt);

    const adminData = new roles.user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPasswordA
    });

    try {
        const savedAdmin = await adminData.save();
        res.send(savedAdmin);
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
})

router.post('/admin',async(req,res)=>{
    //lets validate data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await roles.admin.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Signup first');

    //password is correct
    const validPass =await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('password is wrong');

    //creat and assign token
    const token = jwt.sign({_id:user._id},process.env.TOKEN)
    res.header('auth-token-admin',token).send(token)

})



module.exports = router;
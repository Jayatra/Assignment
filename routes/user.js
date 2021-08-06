const router = require('express').Router();
const roles = require('../model/roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


router.post('/userCreated', async (req, res) => {
    //lets validate data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in db
    const emailExist = await roles.user.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email already exists');

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPasswordU = await bcrypt.hash(req.body.password, salt);

    const userData = new roles.user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPasswordU
    });
    try {
        const savedUser = await userData.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
})
router.post('/user', async (req, res) => {
    //lets validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await roles.user.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Add your data first');

    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('password is wrong');

    //creat and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN)
    res.header('auth-token-user', token).send(token)

})



module.exports = router;

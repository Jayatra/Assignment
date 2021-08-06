const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');
const app = express();

//middelwares
app.use(cors());
app.use(bodyParser.json());


const port = process.env.PORT || 3000


const productRoute = require('./routes/route');
app.use("/api/product",productRoute);


//import user & admin
const user = require('./routes/user');
const admin = require('./routes/admin');

//api of user & admin
app.use('/api/roles-admin',admin);
app.use('/api/roles-user',user);




app.get("/",(req,res)=>{
    res.send('Hello')
})

//connect to db
mongoose.connect(process.env.MONGO_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    ignoreUndefined:true,
    useUnifiedTopology:true
},()=>console.log('Connected to db'))


app.listen(port,()=>console.log(`Server is running on http://localhost:${port}`))
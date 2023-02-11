const express = require('express');
const apicache = require('apicache');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/User')

require('dotenv').config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

const app = express();
let cache = apicache.middleware;

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(cache('5 minutes'));

app.get('/test', (req, res) => {

})

app.post('/register', async(req, res) => {
    const { name, email, password } = req.body;
    
    try{
    bcrypt.hashSync(password,10);
    const user = await User.create({
        name,email,password
    })
    res.json(user);
}catch(err){
    return res.status(422).json(err)
}
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
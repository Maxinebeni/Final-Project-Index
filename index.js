const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

// Connect to MongoDB Atlas cluster
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://maxibeni:Maxibeni@cluster0.ui5j8pp.mongodb.net/';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Error in Connecting to Database:", err));

// Define schema with createIndexes method
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    prof: String,
    country: String,
    password: String,
    cpassword: String,
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

app.post("/signup",(req,res) => {
    var fname= req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var prof=req.body.prof;
    var country=req.body.country;
    var password=req.body.password;
    var cpassword=req.body.cpassword;

    var newUser = new User({
        fname: fname,
        lname: lname,
        email: email,
        prof: prof,
        country: country,
        password: password,
        cpassword: cpassword
    });

    newUser.save((err) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('signup_successful.html');
});

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    });
    return res.redirect('signup.html');
}).listen(3000);

console.log("Listening on port 3000");

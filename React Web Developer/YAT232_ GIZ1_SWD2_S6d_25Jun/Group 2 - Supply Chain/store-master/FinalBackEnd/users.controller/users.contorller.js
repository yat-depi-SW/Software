const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = "mysecretkey";
const Joi = require("joi");
const User = require('../usersscheme/users.scheme'); 
const mongoose = require('mongoose');



const getAllusers = async (req, res) => {
    try {
        const users = await User.find(); 
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching users", error: err.message });
    }
};

const signup = async (req, res) => {
    let newUser = req.body;
    const userSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        age: Joi.number().integer().min(18).required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        hobby: Joi.string().min(3).optional(),
        userRole: Joi.string().valid("admin", "user").default("user"),
    });
    

    const { error } = userSchema.validate(newUser);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hashedPassword;
    const userExists = await User.findOne({ email: newUser.email });
    if (userExists) {
        return res.status(409).json({ message: "User with this email already exists" });
    }

    const user = new User(newUser);
    await user.save(); 

    res.status(201).json({ message: "User signed up successfully", user });
};

const logIn = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "Email not found" });
}

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        secretkey,
        { expiresIn: "1h" }
    );
    return res.status(200).json({ message: "User logged in successfully", token });
};


const getUserById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error reading user data", error: error.message });
    }
};

const deleteuser = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID must be a valid ObjectId" });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "Failed to delete: User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error reading user data", error: error.message });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

if (!token) {
    return res.status(401).json({ message: "Token must be provided" });
}

const bearerToken = token.split(' ')[1];
    jwt.verify(bearerToken, secretkey, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.status(401).json({ message: "Failed to authenticate" });
        }
        req.user = decoded;
        next();
    });
};

const checkRole = async(req, res, next) => {
const {email}=req.body;
const user = await User.findOne({ email });

if (!user.userRole) {
    return res.status(401).json({ message: "denied access" });
}

if (user.userRole !== 'admin') {
        return res.status(403).json({ message: `Access denied:admin role required` });
    }
next();
};



const adminrole = (req, res, next) => {
const token = req.headers['authorization'];

if (!token) {
return res.status(401).json({ message: "Token must be provided" });
}
const bearerToken = token.split(' ')[1];
jwt.verify(bearerToken, secretkey, async(err, decoded) => {
        const {email}=decoded
        const user = await User.findOne({ email });
        if(user.userRole !=='admin'){
            return res.status(401).json({ message: "not admin " });
        }
else{
    next();
}
    })
    
};


module.exports = {
    getAllusers,
    signup,
    logIn,
    getUserById,
    deleteuser,
    verifyToken,
    checkRole,
    adminrole
};

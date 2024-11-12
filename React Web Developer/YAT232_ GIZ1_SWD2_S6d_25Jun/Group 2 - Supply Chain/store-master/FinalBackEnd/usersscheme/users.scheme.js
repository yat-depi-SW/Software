const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    },
    age: {
    type: Number,
    required: true,
    min: 18,
    },
    password: {
    type: String,
    required: true,
    minlength: 8,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
    },
    hobby: {
    type: String,
    minlength: 3,
    default: null,
    },
    createdAt: { type: Date, default: Date.now 
        
    },

    userRole: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    }
},
{ timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;

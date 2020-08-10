import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';


// defined user schema 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true,
        unique: true, dropDups: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
});

// encrypting user password
userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});





// creating the model, this will be the name in the db
const userModel = mongoose.model("User", userSchema);

export default userModel;
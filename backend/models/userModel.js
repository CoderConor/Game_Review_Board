import mongoose from 'mongoose';

// defined user schema 
const userSchema = new mongoose.Schema({
   name: { type: String, required: true},
    email: { type: String, required: true, unique: true, dropDups: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false}
});

// creating the model, this will be the name in the db
const userModel = mongoose.model("User", userSchema);

export default userModel;
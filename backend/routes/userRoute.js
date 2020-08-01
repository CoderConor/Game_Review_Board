import express from 'express';
import User from '../models/userModel';

// making use of the routes feature of express
const router = express.Router();

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Conor',
            email: 'conormoloneycm@gmail.com',
            password: 'abcd',
            isAdmin: true
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ msg: error.message });
    }
});

export default router;
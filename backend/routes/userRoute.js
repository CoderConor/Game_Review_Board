import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

// making use of the routes feature of express
const router = express.Router();

router.post('/signin', async (req, res) => {

    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            // token is used to determine if the next request is authenticated already or not
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({ msg: 'Invalid login credentials.' });
    }
})

router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser)
      });
    } else {
      res.status(404).send({ msg: 'User Not Found' });
    }
  
  });

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else {
        res.status(401).send({ msg: 'Invalid User Data.' });
    }

})

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
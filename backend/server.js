import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';

dotenv.config();
// accessing the mongodb url located in config file
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));

// defining app by running express function
const app = express();
app.use(bodyParser.json());
// implementing users router defined in userRoutes, concatinates the urls to create path
app.use("/api/users", userRoute);

// path for the endpoint, second get parameter is the handler function to respond to the request
app.get("/api/products", (req, res) =>{
  res.send(data.products);
});

// the id is a parameter going through this route, the api response for when a user clicks a certain game
app.get("/api/products/:id", (req, res) =>{
  const productId = req.params.id;
  const product = data.products.find(x=>x._id ==productId);
  if(product)
  res.send(product);
  else
  res.status(404).send({msg: "Game not found."})
});

// an express js function to run the server on port 5000
app.listen(5000, () => { console.log("Server started at http://localhost:5000")});
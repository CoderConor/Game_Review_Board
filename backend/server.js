import express from 'express';
import data from './data';

// defining app by running express function
const app = express();

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
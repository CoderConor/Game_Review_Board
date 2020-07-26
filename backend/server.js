import express from 'express';
import data from './data';

// defining app by running express function
const app = express();

// path for the endpoint, second get parameter is the handler function to respond to the request
app.get("/api/products", (req, res) =>{
  res.send(data.products);
});

// an express js function to run the server on port 5000
app.listen(5000, () => { console.log("Server started at http://localhost:5000")});
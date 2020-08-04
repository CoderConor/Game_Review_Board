import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import uploadRoute from './routes/uploadRoute';
import path from 'path';




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
app.use('/api/uploads', uploadRoute);
// implementing users router defined in userRoutes, concatinates the urls to create path
app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));



// an express js function to run the server on port 5000
app.listen(5000, () => { console.log("Server started at http://localhost:5000")});
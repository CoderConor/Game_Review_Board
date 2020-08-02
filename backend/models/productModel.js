import mongoose from 'mongoose';

// difining the schema to represent the games in the db
const prodctSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    platform: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
  });
  
  const productModel = mongoose.model('Product', prodctSchema);

  export default productModel;
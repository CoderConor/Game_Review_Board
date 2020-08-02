import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

// making use of the routes feature of express
const router = express.Router();

// the router which returns a list of products to the user
router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Game Not Found." });
    }
  });

// api to create a product using the fields in the db
router.post("/", isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        platform: req.body.platform,
        genre: req.body.genre,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: 'Error creating game listing.' });
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.image = req.body.image;
        product.platform = req.body.platform;
        product.genre = req.body.genre;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
        }
    }
    return res.status(500).send({ message: ' Error in Updating Game info.' });

});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: "Game entry Deleted" });
    } else {
      res.send("Error in Deleting game entry.");
    }
  });
    


export default router;
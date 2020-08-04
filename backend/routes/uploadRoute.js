import express from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    // set the name of the file by using the current date and time
    filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    },
  });
  
  const upload = multer({ storage });
  
//   importing the router from express
  const router = express.Router();
  
//   post method to save the file locally uing upload middleware
  router.post('/', upload.single('image'), (req, res) => {
    //   use the following to save the file inside the mongo db for that specific game
    res.send(`/${req.file.path}`);
  });
  export default router;
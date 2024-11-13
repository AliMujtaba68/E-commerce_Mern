import multer from "multer";

// Set up disk storage for images
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname); // Keep the original file name
  },
});

// Initialize Multer with storage configuration and fields for multiple images
const upload = multer({ storage }).fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
]);

export default upload;

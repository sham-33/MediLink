import multer from "multer";
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Append timestamp to the original filename
  },
});

const upload = multer({
    storage
});

export default upload;
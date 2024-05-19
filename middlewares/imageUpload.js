import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 Mo
  fileFilter: function (req, file, cb) {
    const allowedExtensions = /\.(jpg|jpeg|png|webp|svg|avif)$/;
    if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error("Veuillez télécharger un fichier image valide"));
    }
    cb(null, true);
  },
});

export default upload;

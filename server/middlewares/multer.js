import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const id = uuid();
    const extName = path.extname(file.originalname);

    cb(null, `${id}${extName}`);
  },
});

export const uploadFiles = multer({ storage }).single("file");
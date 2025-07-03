import multer from "multer";
import { Request, Response } from "express";
import path from "path";
const fileFilter = (req: Request, file: any, cb: any) => {
  const allowedExtensions = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
  ];
  if (allowedExtensions.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("EXTENSION_INVALIDA"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const uniqueName = `${Date.now()}-${baseName}${ext}`;
    cb(null, uniqueName);
  },
});

const uploadMiddleware = multer({ storage, fileFilter });

export default uploadMiddleware;

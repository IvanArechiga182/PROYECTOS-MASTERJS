import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import multer from "multer";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.message === "EXTENSION_INVALIDA") {
    res.status(400).json({ message: "La extensión del archivo no es válida." });
    return;
  }

  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: err.message });
    return;
  }

  res.status(500).json({
    message: "Error interno del servidor",
    error: err.message || err,
  });
  return;
};

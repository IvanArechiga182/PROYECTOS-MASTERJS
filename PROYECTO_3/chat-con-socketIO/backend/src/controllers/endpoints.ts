import { Request, Response, RequestHandler } from "express";

const controller: { [key: string]: RequestHandler } = {
  home: async (req: Request, res: Response): Promise<any> => {
    return res.status(200).send({
      message: "Hola desde test home",
    });
  },
};

export default controller;

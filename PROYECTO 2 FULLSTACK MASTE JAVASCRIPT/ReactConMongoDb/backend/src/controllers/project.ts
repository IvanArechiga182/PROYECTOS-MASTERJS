import { RequestHandler, Request, Response } from "express";
import NewProject from "../models/modelSchema";
import NewUser from "../models/UsersSchame";
import * as fs from "fs";

const controller: { [key: string]: RequestHandler } = {
  home: (_req, res) => {
    res.status(200).json({ message: "Soy el método home" });
  },
  test: (_req, res) => {
    res.status(200).json({ message: "Soy el método test del controlador" });
  },

  saveProject: async (_req, res) => {
    try {
      let { name, description, category, year, langs, image } = _req.body;
      let project = new NewProject({
        name,
        description,
        category,
        year,
        langs,
        image,
      });
      await project.save();
      res.status(200).send({
        message: "Metodo saveProject",
        savedProject: project,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error al intentar guardar los datos del proyecto!",
        error: error,
      });
    }
  },

  findProject: async (_req, res): Promise<any> => {
    try {
      let { projectId } = _req.params;
      const foundProject = await NewProject.findOne({
        _id: projectId,
      }).exec();

      if (!foundProject) {
        return res.status(400).send({
          message: "No se ha encontrado ningun proyecto.",
        });
      }

      return res.status(200).send({
        message: "Se encontro correctamente el registro.",
        project: foundProject,
      });
    } catch (error) {
      res.status(500).send({
        message: "No se ha podido completar la operacion correctamente",
        error: error,
      });
    }
  },

  getProjectsData: async (_req, res): Promise<any> => {
    try {
      const projects = await NewProject.find({});
      if (!projects) {
        return res.status(400).send({
          message:
            "Se ha procesado la solicitud, pero no hay informacion para retornar",
        });
      }
      return res.status(200).send({
        message: "Se ha procesado la solicitud correctamente!",
        data: projects,
      });
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al procesar la solicitud!",
      });
    }
  },

  updateProject: async (_req: Request, res: Response): Promise<any> => {
    try {
      if (!_req.is("json")) {
        return res.status(415).send({
          message: "Content-Type debe ser application/json",
        });
      }

      const projectId = _req.query.projectId;
      const dataTopUpdate = _req.body;
      const filterById = { _id: projectId };
      const updatedProject = await NewProject.findOneAndUpdate(
        filterById,
        { $set: dataTopUpdate },
        { new: true }
      );

      if (!updatedProject) {
        return res.status(404).send({
          message: "No se encontro ningun documento para actualizar",
        });
      }

      return res.status(200).send({
        message: "Se ha actualizado el documento correctamente!",
        data: updatedProject,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error al actualizar", error });
    }
  },

  deleteProject: async (_req, res): Promise<any> => {
    try {
      const projectId = _req.query.projectId;
      if (
        !projectId ||
        typeof projectId !== "string" ||
        projectId.trim() === ""
      ) {
        return res.status(400).send({
          message:
            "El parametro projectName es requerido, no puede estar vacio",
        });
      }

      let deletedProject = await NewProject.findOne({ _id: projectId });
      if (!deletedProject) {
        return res.status(400).send({
          message: `No se ha encontrado ningun proyecto con nombre '${projectId}`,
        });
      }
      await NewProject.deleteOne({ _id: projectId });
      return res.status(200).send({
        message: "Se elimino el proyecto correctamente",
        details: deletedProject,
      });
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error en la consulta.",
      });
    }
  },

  uploadImageToProject: async (req: Request, res: Response): Promise<any> => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).send({
          message:
            "No se ha adjunatado ningun archivo o el archivo no es una extension aceptada (JPG, PNG, JPEG o GIF)",
        });
      }
      let projectId = req.params.id;
      let originalName = req.file?.originalname;
      let fileName = req.file?.filename;

      let updatedDocumentWithImage = await NewProject.findOneAndUpdate(
        { _id: projectId },
        { imageOriginal: originalName, fileName: fileName },
        { new: true }
      );

      if (!updatedDocumentWithImage) {
        return res.status(404).send({
          message: `No se encontro ningun documento con id: ${projectId}`,
        });
      }

      return res.status(200).send({
        message: "Se ha insertado correctamente la imagen!",
        file,
      });
    } catch (error) {
      return res.status(500).send({
        message: "No se ha podido procesar correctamente la solicitud",
      });
    }
  },

  emptyCollection: async (req, res): Promise<any> => {
    try {
      const emptyCollection = await NewProject.deleteMany({});

      if (!emptyCollection) {
        return res.status(400).send({
          message: "No se ha podido limpiar la coleccion",
        });
      }

      return res.status(200).send({
        message: "Se ha limpiado correctamente la coleccion",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Ha ocurrido un error en la operación",
        details: error,
      });
    }
  },

  postContactInfo: async (req: Request, res: Response): Promise<any> => {
    if (!req.is("json")) {
      return res.status(415).send({
        message: "Content-Type debe ser application/json",
      });
    }

    try {
      const { username, lastname, email, phoneNumber } = req.body;

      const newUserContactInfo = new NewUser({
        username,
        lastname,
        email,
        phoneNumber,
      });
      const uploadedContactInfo = await newUserContactInfo.save();

      if (uploadedContactInfo && uploadedContactInfo._id) {
        return res.status(200).send({
          message: "hola desde ContactInfo",
        });
      }
      return res.status(400).send({
        message: "No se ha podido insertar la información de contacto.",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "ValidationError")
          return res.status(400).send({
            message: "No se han mandado todos los campos necesarios.",
            error,
          });

        return res.status(500).send({
          messge: "Error interno del servidor desconocido.",
          error,
        });
      }
    }
  },
};

export default controller;

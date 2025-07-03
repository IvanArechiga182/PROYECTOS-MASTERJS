import { useEffect, useState } from "react";
import type { Project } from "../../interfaces/ProjectInterface";
import "./CreateProjectForm.css";
import { useNavigate } from "react-router-dom";

interface Props {
  mode: "create" | "edit";
  projectToEdit?: Project;
}

function CreateProjectForm({ mode, projectToEdit }: Props) {
  const API_BASE_URL = "http://localhost:4000/api/project/";
  const BASE_IMG_PATH = "http://localhost:4000/uploads/";
  const BASE_FILE_MSG = "Ningún archivo seleccionado";
  const navigate = useNavigate();
  const [fileName, setFileName] = useState(BASE_FILE_MSG);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<Project>({
    name: "",
    description: "",
    category: "",
    year: "",
    langs: "",
    image: "",
    fileName: "",
  });

  const [statusMessage, setStatusMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "edit" && projectToEdit) {
      setForm(projectToEdit);
      setFileName(projectToEdit.fileName || BASE_FILE_MSG);
    }
  }, [mode, projectToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "projectCreationYear" ? Number(value) : value,
    }));
  };

  const isFormValid = () => {
    return (
      form.name.trim() !== "" &&
      form.description.trim() !== "" &&
      Number(form.year) > 0 &&
      form.category.trim() !== "" &&
      form.langs.trim() !== "" &&
      fileName !== "Ningún archivo seleccionado"
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      if (e.target.files[0].name.length > 30) {
        alert("Nombre de archivo muy largo.");
        return;
      }
      setFileName(e.target.files[0].name);
    } else {
      setImageFile(null);
      setFileName(BASE_FILE_MSG);
    }
  };

  const handleStatusMessage = (error: boolean) => {
    if (error) {
      setStatusMessage("No se ha podido enviar el fomulario.");
    } else {
      setStatusMessage("Se ha enviado correctamente el formulario!");
    }
    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      image: fileName,
    };
    try {
      const url =
        mode === "create"
          ? `${API_BASE_URL}saveProject`
          : `${API_BASE_URL}updateProject?projectId=${form._id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!res.ok) {
        setError(true);
        handleStatusMessage(error);
        throw new Error("Error al obtener los proyectos");
      }

      const data = await res.json();
      const projectId = mode === "create" ? data.savedProject._id : form._id;
      handleStatusMessage(error);

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const url = `${API_BASE_URL}uploadImageToProject/${projectId}`;
        console.log(url);
        const imgRes = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!imgRes.ok) {
          throw new Error("Error al subir el archivo de imagen");
        }

        console.log("Imagen correctamente adjuntada al proyecto");
      }

      navigate("/viewProjects");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("La cagaste");
      } else {
        console.log("quien sabe que paso");
      }
    } finally {
      console.log("Ya terminamos");
    }
  };

  return (
    <div className="container">
      <h2 className={`mensaje ${error ? "error" : "success"}`}>
        {statusMessage}
      </h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Crea un proyecto</h2>
          <label htmlFor="projectName">Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            id="projectName"
            onChange={handleChange}
            required
          />
          <label htmlFor="projectDescription">Descripción</label>
          <textarea
            name="description"
            id="projectDescription"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="projectCategory">Categoría</label>
          <input
            type="text"
            name="category"
            id="projectCategory"
            value={form.category}
            onChange={handleChange}
            required
          />
          <label htmlFor="projectCreationYear">Año</label>
          <input
            type="text"
            name="year"
            id="projectCreationYear"
            value={form.year}
            onChange={handleChange}
            required
            maxLength={4}
          />
          <label htmlFor="projectUsedLanguages">Lenguajes utilizados</label>
          <input
            type="text"
            name="langs"
            id="projectUsedLanguages"
            value={form.langs}
            onChange={handleChange}
            required
          />

          {mode === "edit" && projectToEdit?.fileName && (
            <div className="image-preview">
              <img
                src={`${BASE_IMG_PATH}${projectToEdit.fileName}`}
                alt="Imagen del proyecto"
              />
            </div>
          )}

          <label htmlFor="projectImg" className="custom-upload-button">
            {mode === "edit" ? "Cambiar imagen" : "Subir imagen"}
          </label>
          <input type="file" id="projectImg" onChange={handleFileChange} />
          <span>{fileName}</span>
          <input
            type="submit"
            value="Guardar Proyecto"
            id="saveProjectBtn"
            disabled={!isFormValid()}
          />
        </form>
      </div>
    </div>
  );
}

export default CreateProjectForm;

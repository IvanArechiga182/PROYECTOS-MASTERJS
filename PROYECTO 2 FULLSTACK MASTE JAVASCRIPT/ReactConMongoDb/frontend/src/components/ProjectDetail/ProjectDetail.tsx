import { useEffect, useState } from "react";
import type { Project } from "../../interfaces/ProjectInterface";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetail.css";
function ProjectDetail() {
  const API_BASE_URL = "http://localhost:4000/api/project/";
  const BASE_IMG_PATH = "http://localhost:4000/uploads/";
  const [status, setStatus] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [projectInfo, setProjectInfo] = useState<Project | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const handleStatusMessage = (error: boolean) => {
    if (error) {
      setStatus("No se ha podido traer la informacion.");
    } else {
      setStatus("Se ha traido la informacion correctamente.");
    }
    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}findProjectById/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          setHasError(true);
          handleStatusMessage(true);
          throw new Error(
            "No se ha podido obtener la información de los proyectos"
          );
        }
        setHasError(false);
        handleStatusMessage(false);
        const projectDetails = await res.json();
        setProjectInfo(projectDetails.project);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Error desconocido en la consulta: ${error}`);
        }
      }
    };

    fetchProjectData();
  }, [id]);

  const handleDelete = async (projectId: string) => {
    const isConfirmed = window.confirm(
      `Estas a punto de borrar el proyecto ${projectInfo?.name} ¿Deseas continuar?`
    );
    if (!isConfirmed) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}deleteProjectById?projectId=${encodeURIComponent(
          projectId
        )}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("No se ha podido completar la operacion.");
      }

      const data = await res.json();
      console.log("Proyecto eliminado: ", data);
      navigate("/viewProjects");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Hubo un error desconocido");
      }
    }
  };

  if (!projectInfo) return <p>No se encontró ningún proyecto</p>;

  return (
    <div className="container">
      <h1 className={`request-status ${hasError ? "error" : "success"}`}>
        {status}
      </h1>

      <div className="project-detail-container">
        <img
          src={`${BASE_IMG_PATH}${projectInfo.fileName}`}
          alt="project-image-reference"
        />
        <ul>
          <li>
            <strong>Nombre:</strong> {projectInfo.name}
          </li>
          <li>
            <strong>Descripción: </strong>
            {projectInfo.description}
          </li>
          <li>
            <strong>Categoría: </strong>
            {projectInfo.category}
          </li>
          <li>
            <strong>Año: </strong>
            {projectInfo.year}
          </li>
          <li>
            <strong>Lenguajes: </strong>
            {projectInfo.langs}
          </li>
          <div className="project-actions">
            <div className="delete-project">
              <h2
                onClick={() => {
                  if (projectInfo._id) {
                    handleDelete(projectInfo._id);
                  } else {
                    console.error("No se puede eliminar: ID no disponible");
                  }
                }}
              >
                Borrar
              </h2>
            </div>
            <div className="edit-project">
              <h2
                onClick={() => {
                  navigate(`/editProjectDetail/${projectInfo._id}`);
                }}
              >
                Editar
              </h2>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetail;

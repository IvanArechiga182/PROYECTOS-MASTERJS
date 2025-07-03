import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../interfaces/ProjectInterface";
import "./ProjectsGrid.css";

function ProjectsGrid() {
  const API_BASE_URL = "http://localhost:4000/api/project/";
  const BASE_IMG_PATH = "http://localhost:4000/uploads/";
  const [status, setStatus] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [projectsInfo, setProjectsInfo] = useState<Project[]>([]);

  const handleStatusMessage = (error: boolean) => {
    if (error) {
      setStatus("No se ha podido traer la informacion.");
    } else {
      setStatus("Se ha traido la informacion correctamente!");
    }
    document.getElementById("request-status");
    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const projects = await fetch(`${API_BASE_URL}getProjectsData`);

        if (!projects.ok) {
          setHasError(true);
          handleStatusMessage(true);
          throw new Error(
            "No se ha podido obtener la información de los proyectos"
          );
        }
        setHasError(false);
        handleStatusMessage(false);
        const projectsData = await projects.json();
        setProjectsInfo(projectsData.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Error desconocido en la consulta: ${error}`);
        }
      }
    };

    fetchAllProjects();
  }, []);

  return (
    <div className="container">
      <h1 className={`request-status ${hasError ? "error" : "success"}`}>
        {status}
      </h1>

      <div className="projects-info-container">
        {projectsInfo.map((project, index) => (
          <ul key={index}>
            <img
              src={`${BASE_IMG_PATH}${project.fileName}`}
              alt="project-image-reference"
            />
            <li>
              <strong>Nombre:</strong> {project.name}
            </li>
            <li>
              <strong>Descripción: </strong>
              {project.description}
            </li>
            <Link to={`/projectDetail/${project._id}`}>Ver detalles</Link>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default ProjectsGrid;

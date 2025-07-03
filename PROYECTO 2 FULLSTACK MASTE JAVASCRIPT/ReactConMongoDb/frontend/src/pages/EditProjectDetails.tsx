import { useEffect, useState } from "react";
import CreateProjectForm from "../components/CreateProjectForm/CreateProjectForm";
import type { Project } from "../interfaces/ProjectInterface";
import { useParams } from "react-router-dom";

function EditProjectDetails() {
  const API_BASE_URL = "http://localhost:4000/api/project/";
  const [projectInfo, setProjectInfo] = useState<Project | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}findProjectById/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(
            "No se ha podido obtener la información de los proyectos"
          );
        }
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

  if (!projectInfo) return <h2>No se ha podido trare la informacion.</h2>;

  return (
    <div className="edit-project-details-container">
      <CreateProjectForm mode="edit" projectToEdit={projectInfo} />
    </div>
  );
}

export default EditProjectDetails;

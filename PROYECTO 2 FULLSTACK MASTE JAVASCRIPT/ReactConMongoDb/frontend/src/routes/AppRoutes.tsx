import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Create from "../pages/Create";
import Projects from "../pages/Projects";
import ErrorPage from "../pages/ErrorPage";
import Contact from "../pages/Contact";
import ProjectDetails from "../pages/ProjectDetails";
import EditProjectDetails from "../pages/EditProjectDetails";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/createProject" element={<Create />} />
      <Route path="/viewProjects" element={<Projects />} />
      <Route path="/projectDetail/:id" element={<ProjectDetails />} />
      <Route path="/editProjectDetail/:id" element={<EditProjectDetails />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;

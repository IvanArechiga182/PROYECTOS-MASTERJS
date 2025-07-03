import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavigationBar from "./components/NavBar/NavigationBar";
import Footer from "./components/Footer/Footer";
const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;

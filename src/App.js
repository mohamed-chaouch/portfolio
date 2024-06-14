import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/navbar";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Box } from "@mui/material";
import AddProject from "./pages/Projects/addProject";
import ProjectDetail from "./pages/Projects/Details";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Work />} />
        <Route path="/create-project" element={<AddProject />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Box>
  );
}

export default App;

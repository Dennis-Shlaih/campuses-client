//This is the main entry point of the app. It sets up the routes for the different pages of the app using React Router. 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Students from "./pages/Students";
import Student from "./pages/Student";
import AddStudent from "./pages/AddStudent";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<Student />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
//This is the main entry point of the app. It sets up the routes for the different pages of the app using React Router. 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Students from "./pages/Students";
import Student from "./pages/Student";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import NotFound from "./pages/NotFound";
import AllCampuses from "./pages/AllCampuses";
import CampusDetails from "./pages/CampusDetails";
import AddCampus from "./pages/AddCampus";
import EditCampus from "./pages/EditCampus";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/:id" element={<Student />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />
          <Route path="/campuses" element={<AllCampuses/>}/>
          <Route path="/campuses/add"element={<AddCampus/>}/>
          <Route path="/campuses/:id"element={<CampusDetails/>}/>
          <Route path="/campuses/:id/edit"element={<EditCampus/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
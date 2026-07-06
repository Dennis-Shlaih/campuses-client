//This is the main entry point of the app. It sets up the routes for the different pages of the app using React Router. 
import { BrowserRouter, Routes, Route } from "react-router-dom"; //this import is what allows our app to behave like a multi-page website in regards to the links
import Navbar from "./components/Navbar"; //bring in functions from the files that we have created same for the rest of the imports from this point on they also use react

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

function App() { //function name app starting point
  return ( // this line is what gives the output that the app function is supposed to give gives the coding rules that react further uses in html look alike form for this case
    <BrowserRouter>{/*this is what enables the router part that allows for the multipage*/}
      <Navbar /> {/*this creates the visible navbar that we created in the file*/}
      <main className="min-h-screen bg-gray-100 p-6"> {/*this is the main section of the app, and it is in a like container like feature  that we added with min-h-screen combined with the main tag*/}
        <Routes> {/*This line is responsible for checking the url of all of the content inside of it */}
          <Route path="/" element={<Home />} /> {/*now here route tells us which read in url belongs to who and this line is also the reason that the home page is actually showing all the time  */}
          {/*similar story for the rest of them we grab the correct url, then we name the file that we would 
          like to work with click on the link provided by the navbar, and then we open and can actually see all 
          of the componenets features and buttons that said file created because we tied it all together here */}
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

export default App; //this line just allows for the app file to be exportable and used in other files
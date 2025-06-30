import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navigation-bar";
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import ProfilePage from "./pages/ProfilePage";
import SuggestionsPage from "./pages/SuggestionsPage";
import ScholarshipDetailsPage from "./pages/ScholarshipDetailsPage";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
        <Route path="/scholarship/:id" element={<ScholarshipDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;

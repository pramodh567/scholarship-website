import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navigation-bar";
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;

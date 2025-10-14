import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './componant/Login';
import MainPage from './componant/MainPage';
import RDVTable from "./componant/Rdv"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RDV" element={<RDVTable />} />

      </Routes>
    </div>
  );
}

export default App;
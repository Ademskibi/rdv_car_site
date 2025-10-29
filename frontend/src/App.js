import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './componant/Admin/Login';
import MainPage from './componant/MainPage';
import RDVTable from "./componant/Admin/Rdv"
import BigRDVCalendar from './componant/Admin/BigRDVCalendar';
import FastService from './componant/User/FastService'; 
import Diagnostics from './componant/User/Diagnostics'; 
import ReplaceEngine from './componant/User/ReplaceEngine'; 
import Reclamation from './componant/User/Reclamation'; 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/calendar" element={<BigRDVCalendar />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RDV" element={<RDVTable />} />
        <Route path="/fast-service" element={<FastService />} />
        <Route path="/diagnostics" element={<Diagnostics />} />
        <Route path="/replace-engine" element={<ReplaceEngine />} />
        <Route path="/reclamation" element={<Reclamation />} />
      </Routes>
    </div>
  );
}

export default App;
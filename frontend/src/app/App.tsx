import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimulatorPage } from "../pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SimulatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}


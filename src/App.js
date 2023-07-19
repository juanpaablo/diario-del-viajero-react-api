import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Login from './components/login';


import Atraccion from './components/atraccion';
import Listado from './components/main';
import AtraccionDetalles from './components/atraccionDetalles';
import EditarAtraccion from './components/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listado />} />
        <Route path="/atraccion" element={<Atraccion />} />
        
        <Route path="/atracciones/:id" element={<AtraccionDetalles/>} />
        <Route path="/Edit" element={<EditarAtraccion/>} />
      </Routes>
    </Router>
  );
}

export default App;
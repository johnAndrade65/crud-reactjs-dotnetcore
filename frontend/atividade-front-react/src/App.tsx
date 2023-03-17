import "./App.css";
import Atividade from "./pages/atividades/Atividade";
import { Router, Routes, Route } from "react-router-dom";
import Cliente from "./pages/clientes/Cliente.tsx";
import ClienteForm from "./pages/clientes/ClienteForm.tsx";
import Dashboard from "./pages/dashboard/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import React from "react";

const App = () => {
  return (
      <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/atividade/*' element={<Atividade />} />
          <Route path='/atividade/:id/cliente' element={<Cliente />} />
          <Route path='/cliente/*' element={<Cliente />} />
          <Route path='/cliente/:id/atividade' element={<Atividade />} />
          <Route path='/cliente/detalhe/' element={<ClienteForm />} />
          <Route path='/cliente/detalhe/:id' element={<ClienteForm />} />
          <Route element={<PageNotFound />} />
      </Routes>
  );
}

export default App;
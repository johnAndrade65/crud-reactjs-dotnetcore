import { useState, useEffect } from "react";
import "./App.css";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";

//Valores das atividades padrões já inseridas no programa
let initialState = [
  {
    id: 1,
    prioridade: "1",
    titulo: "Título",
    descricao: "Primeira atividade",
  },
  {
    id: 2,
    prioridade: "1",
    titulo: "Título",
    descricao: "Segunda atividade",
  },
];

//Componente "App"
function App() {
  //usestate para auxiliar a função "AddAtividade" passando os valores em tempo real para a criação das atividades
  const [atividades, setAtividades] = useState(initialState);
  const [atividade, setAtividade] = useState({id: 0});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    atividades.length <= 0 ? setIndex(1) : 
    setIndex(Math.max.apply(Math, atividades.map((item) => item.id)) + 1)
  }, [atividades])

  //Mais comentarios na proxima atualização
  function addAtividade(ativ) {
    setAtividades([...atividades,
      { ...ativ, id: index}])}

  function cancelarAtividade(){
    setAtividade({id: 0})
  }

  function atualizarAtividade(ativ){
    setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item));
    setAtividade({id: 0});
  }

  function deletarAtividade(id) {
    const atividadesFiltradas = atividades.filter(
      (atividade) => atividade.id !== id
    );
    setAtividades([...atividadesFiltradas]);
  }
  function pegarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
  }

  return (
    <>
      <AtividadeForm
        addAtividade={addAtividade}
        cancelarAtividade={cancelarAtividade}
        atualizarAtividade={atualizarAtividade}
        atividades={atividades}
        ativSelecionada={atividade}
      />
      <AtividadeLista
        atividades={atividades}
        deletarAtividade={deletarAtividade}
        pegarAtividade={pegarAtividade}
      />
    </>
  );
}

export default App;

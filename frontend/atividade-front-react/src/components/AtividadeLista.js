import React from "react";
//Importação do compopnente "Atividade"
import Atividade from "./Atividade";

//Componente "AtividadeLista"
export default function AtividadeLista(props) {
  //O componente "AtividadeLista" utiliza elementos próprios e elementos do componente "Atividade"
  return (
<div className="mt-3">
      {props.atividades.map((ativ) => (
        <Atividade
          key={ativ.id}
          ativ={ativ}
          deletarAtividade={props.deletarAtividade}
          pegarAtividade={props.pegarAtividade}
        />
      ))}
    </div> 
  );
}

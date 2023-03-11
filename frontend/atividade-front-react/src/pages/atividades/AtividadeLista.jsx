import React from "react";
//Importação do compopnente "Atividade"
import AtividadeItem from "./AtividadeItem";

//Componente "AtividadeLista"
export default function AtividadeLista(props) {
  //O componente "AtividadeLista" utiliza elementos próprios e elementos do componente "Atividade"
  return (
<div className="mt-3">
      {props.atividades.map((ativ) => (
        <AtividadeItem
          key={ativ.id}
          ativ={ativ}
          pegarAtividade={props.pegarAtividade}
          handleConfirmModal={props.handleConfirmModal}
        />
      ))}
    </div> 
  );
}

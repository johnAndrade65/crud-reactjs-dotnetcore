import React from "react";
//Importação do compopnente "Atividade"
import AtividadeItem from "./AtividadeItem";
import { AtividadeListaProps } from './../../model/atividadesProps';

//Componente "AtividadeLista"
const AtividadeLista: React.FC<AtividadeListaProps> = ({
  atividades,
  handleConfirmModal,
  pegarAtividade
}: AtividadeListaProps ) => {
  //O componente "AtividadeLista" utiliza elementos próprios e elementos do componente "Atividade"
  return (
<div className="mt-3">
      {atividades.map((ativ) => (
        <AtividadeItem
          key={ativ.id}
          ativ={ativ}
          pegarAtividade={pegarAtividade}
          handleConfirmModal={handleConfirmModal}
        />
      ))}
    </div> 
  );
}

export default  AtividadeLista;

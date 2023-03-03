import React from "react";

//Componente "Atividade" exportado para o componente "AtividadeLista"
export default function Atividade(props) {
  //Função para selecionar a prioridade da atividade
  function prioridadeLabel(param){
    switch(param){
      case '1':
        return 'Baixa'
      case '2':
        return 'Média'
      case '3':
        return 'Alta'
      default:
        return 'Não definido'
    }
  }
  //Função para mudar o icone e a estilização de acordo com a prioridade selecionada
  function prioridadeStyle(param, icone){
    switch(param){
      case '1':
        return icone ? 'smile' : 'success';
      case '2':
        return icone ? 'meh' : 'dark';
      case '3':
        return icone ? 'frown' : 'danger';
      default:
        return 'Não D]definido'
    }
  }

  //Renderização do componente "Atividade"
  return (
    <div
      key={props.ativ.id}
      className={
        "card mb-2 shadow-sm border-" + prioridadeStyle(props.ativ.prioridade)
      }
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge bg-secondary me-1">{props.ativ.id}</span> -
            {props.ativ.titulo}
          </h5>
          <h6>
            Prioridade:
            <span className={"ms-1 text-" + prioridadeStyle(props.ativ.prioridade)}>
              <i
                className={
                  "me-1 far fa-" + prioridadeStyle(props.ativ.prioridade, true)
                }
              ></i>
              {prioridadeLabel(props.ativ.prioridade)}
            </span>
          </h6>
        </div>
        <p className="card-text">
          {props.ativ.id} - {props.ativ.descricao}
        </p>
        <div className="d-flex justify-content-end pt-2 border-top m-0">
          <button className="btn btn-outline-primary me-2 btn-sm"
          onClick={() => props.pegarAtividade(props.ativ.id)}>
            <i className="fas fa-pen me-2"></i>
            Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => props.deletarAtividade(props.ativ.id)}
          >
            <i className="fas fa-trash me-2"></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

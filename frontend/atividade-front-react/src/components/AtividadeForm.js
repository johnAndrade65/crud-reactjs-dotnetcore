import { useEffect, useState } from "react";

const atividadeInicial = {
  id: 0,
  titulo: "",
  prioridade: 0,
  descricao: "",
};

//Componente "AtividadeForm"
export default function AtividadeForm(props) {
  //useState para atualizar o valor do id da atividade no momento de criar-la
  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.ativSelecionada.id !== 0) {
      setAtividade(props.ativSelecionada);
    }
  }, [props.ativSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setAtividade({ ...atividade, [name]: value });
  };

  function atividadeAtual() {
    if (props.ativSelecionada.id !== 0) {
      return props.ativSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(props.ativSelecionada.id !== 0){
      props.atualizarAtividade(atividade);
    }else{
      props.addAtividade(atividade);
    }
    setAtividade(atividadeInicial);
  }

  const handleCancelar = (e) => {
    e.preventDefault();
    props.cancelarAtividade();

    setAtividade(atividadeInicial);
  };
  //Ignore, ainda em construção!.

  //Elementos do componente "AtividadeForm"
  return (
    <>
      <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input
            id="titulo"
            className="form-control"
            type="text"
            placeholder="Título"
            name="titulo"
            value={atividade.titulo}
            onChange={inputTextHandler}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            id="prioridade"
            className="form-select"
            name="prioridade"
            value={atividade.prioridade}
            onChange={inputTextHandler}
          >
            <option value="NaoDefinido">Selecionar...</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Descrição</label>
          <textarea
            id="descricao"
            className="form-control"
            type="text"
            placeholder="descrição"
            name="descricao"
            value={atividade.descricao}
            onChange={inputTextHandler}
          />
        <hr/>
        </div>
        <div className="col-12 mt-0">
          {atividade.id === 0 ? (
            <button
              className="btn btn-outline-secondary"
              type="submit"
            >
              {" "}
              <i className="fas fa-plus me-2"></i>
              Atividade
            </button>
          ) : (
            <>
              <button className="btn btn-outline-success me-2" type="submit">
                <i className="fas fa-plus me-2"></i>
                Salvar
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={handleCancelar}
              >
                {" "}
                <i className="fas fa-plus me-2"></i>
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}

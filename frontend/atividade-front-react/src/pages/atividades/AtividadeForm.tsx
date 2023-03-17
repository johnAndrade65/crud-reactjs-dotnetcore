import { useEffect, useState } from "react";
import { IAtividade, Prioridade } from "../../model/atividade";
import { AtividadeFormProps } from "../../model/atividadesProps";

const atividadeInicial: IAtividade = {
  id: 0,
  titulo: "",
  prioridade: Prioridade.NaoDefinido,
  descricao: "",
};

//Componente "AtividadeForm"
const AtividadeForm: React.FC<AtividadeFormProps> = ({
  ativSelecionada,
  atualizarAtividade,
  addAtividade,
  cancelarAtividade
}: AtividadeFormProps) => {

  //useState para atualizar o valor do id da atividade no momento de criar-la
  const [atividade, setAtividade] = useState<IAtividade>(atividadeAtual());

  useEffect(() => {
    if (ativSelecionada.id !== 0) {
      setAtividade(ativSelecionada);
    }
  }, [ativSelecionada]);

  const handleValue = (e: any) => {
    const { name, value } = e.target;

    setAtividade({ ...atividade, [name]: value });
  };

  function atividadeAtual(): IAtividade {
    if (ativSelecionada.id !== 0) {
      return ativSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (ativSelecionada.id !== 0) {
      atualizarAtividade(atividade);
    } else {
      addAtividade(atividade);
    }
    setAtividade(atividadeInicial);
  };

  const handleCancelar = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cancelarAtividade();

    setAtividade(atividadeInicial);
  };
  //Ignore, ainda em construção!.

  //Elementos do componente "AtividadeForm"
  return (
    <>
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
            onChange={handleValue}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            id="prioridade"
            className="form-select"
            name="prioridade"
            value={atividade.prioridade}
            onChange={handleValue}
          >
            <option value="NaoDefinido">Selecionar...</option>
            <option value="Baixa">Baixa</option>
            <option value="Normal">Normal</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Descrição</label>
          <textarea
            id="descricao"
            className="form-control"
            placeholder="descrição"
            name="descricao"
            value={atividade.descricao}
            onChange={handleValue}
          />
          <hr />
        </div>
        <div className="col-12 mt-0">
          {atividade.id === 0 ? (
            <button className="btn btn-outline-success" type="submit">
              {" "}
              <i className="fas fa-check me-2"></i>
              Salvar
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
};

export default AtividadeForm;

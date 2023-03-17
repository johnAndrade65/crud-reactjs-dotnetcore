import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import AtividadeForm from "./AtividadeForm.tsx";
import AtividadeLista from "./AtividadeLista.tsx";
import api from "../../api/atividade.ts";
import TitlePage from "../../components/TitlePage.tsx";
import { IAtividade, Prioridade } from "../../model/atividade.ts";

const atividadeInicial: IAtividade = {
    id: 0,
    titulo: "",
    prioridade: Prioridade.NaoDefinido,
    descricao: "",
  };  

//Componente "App"
const Atividade = () => {

 //usestate para auxiliar a função "AddAtividade" passando os valores em tempo real para a criação das atividades
 const [atividades, setAtividades] = useState<IAtividade[]>([]);
 const [atividade, setAtividade] = useState<IAtividade>(atividadeInicial);
 const [ShowAtividadeModal, setShowAtividadeModal] = useState(false);
 const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

 const handleAtividadeModal = () => setShowAtividadeModal(!ShowAtividadeModal);

 const handleConfirmModal = (id: number) => {
  if (id !== 0 && id !== undefined) {
   const atividade = atividades.filter(
    (atividade) => atividade.id === id);
   setAtividade(atividade[0]);
  } else {
   setAtividade(atividadeInicial);
  }
  setSmShowConfirmModal(!smShowConfirmModal);
 };

 const pegarTodasAtividades = async () => {
  const response = await api.get("atividade");
  return response.data;
 };

 const novaAtividade = () => {
  setAtividade(atividadeInicial);
  handleAtividadeModal();
 };

 useEffect(() => {
  const getAtividades = async () => {
   const todasAtividades = await pegarTodasAtividades();

   if (todasAtividades) {
    setAtividades(todasAtividades);
   }
  };
  getAtividades();
 }, []);

 //Mais comentarios na proxima atualização
 const addAtividade = async (ativ: IAtividade) => {
  const response = await api.post("atividade", ativ);
  console.log(response.data);
  setAtividades([...atividades, response.data]);

  handleAtividadeModal();
 };

 const cancelarAtividade = () => {
  setAtividade(atividadeInicial);

  handleAtividadeModal();
 };

 const atualizarAtividade = async (ativ: IAtividade) => {
  const response = await api.put(`atividade/${ativ.id}`, ativ);
  const { id } = response.data;

  setAtividades(
   atividades.map((item) => (item.id === id ? response.data : item))
  );
  setAtividade(atividadeInicial);

  handleAtividadeModal();
 };

 const deletarAtividade = async (id: number) => {
  handleConfirmModal(0);
  if (await api.delete(`atividade/${id}`)) {
   const atividadesFiltradas = atividades.filter(
    (atividade) => atividade.id !== id
   );

   setAtividades([...atividadesFiltradas]);
  }
 };

 const pegarAtividade = (id: number) => {
  const atividade = atividades.filter((atividade) => atividade.id === id);
  setAtividade(atividade[0]);

  handleAtividadeModal();
 };

 return (
  <>
   <TitlePage title={"Atividade" + (atividade.id !== 0 ? atividade.id : "")}>
    <Button variant="outline-secondary" onClick={novaAtividade}>
     <i className="fas fa-plus"></i>
    </Button>
   </TitlePage>
   <AtividadeLista
    atividades={atividades}
    pegarAtividade={pegarAtividade}
    handleConfirmModal={handleConfirmModal}
   />

   <Modal show={ShowAtividadeModal} onHide={handleAtividadeModal}>
    <Modal.Header closeButton>
     <Modal.Title>
      <h1 className="m-0 p-0">
       Atividade {atividade.id !== 0 ? atividade.id : ""}
      </h1>
     </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <AtividadeForm
      addAtividade={addAtividade}
      cancelarAtividade={cancelarAtividade}
      atualizarAtividade={atualizarAtividade}
      ativSelecionada={atividade}
     />
    </Modal.Body>
   </Modal>

   <Modal size="sm" show={smShowConfirmModal} onHide={handleConfirmModal}>
    <Modal.Header closeButton>
     <Modal.Title>
      Excluido Atividade {atividade.id !== 0 ? atividade.id : ""}
     </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     Tem certeza que deseja excluir a atividade {atividade.id}?
    </Modal.Body>
    <Modal.Footer className="d-flex justify-content-between">
     <button
      className="btn btn-outline-success me-2"
      onClick={() => deletarAtividade(atividade.id)}
     >
      <i className="fas fa-check me-2"></i>
      Sim
     </button>
     <button
      className="btn btn-danger me-2"
      onClick={() => handleConfirmModal(0)}
     >
      <i className="fas fa-times me-2"></i>
      Não
     </button>
    </Modal.Footer>
   </Modal>
  </>
 );
}

export default Atividade;

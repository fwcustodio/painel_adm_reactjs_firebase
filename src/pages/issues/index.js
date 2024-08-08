import React, {useState, useEffect, use} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';

import Container from '~/componentes/container';
import {
  getRepositorios,
  getIssues,
  enviarHorasIssue,
  enviarComentarioIssue,
} from '~/servicos/firebase_api';
import Grid from '~/componentes/grid';
import {getNLinhasPadraoGrid} from '~/core';
import Edit from '@material-ui/icons/Edit';
import AccessTime from '@material-ui/icons/AccessTime';
import Description from '@material-ui/icons/Description';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {Button} from '@material-ui/core';
import {TextInputAdmin, SelectInputAdmin} from '~/componentes/TextInputAdmin';
import {
  DivConteudoFormulario,
  Formulario,
  DivBotao,
  DivBotaoVoltar,
  ClassesBase,
  DivPermissoesAcesso,
  DivLabelPermissoesAcesso,
  Label,
} from '~/styles_base';

import MenuItem from '@material-ui/core/MenuItem';

const BlogPosts = (props) => {
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Total, setTotal] = useState(0);
  const [Page, setPage] = useState(1);
  const [LinhasPorPagina, setLinhasPorPagina] = useState(
    getNLinhasPadraoGrid(),
  );
  const History = useHistory();
  const Location = useLocation();

  const {id} = useParams(); //ID Projeto;
  const [Repositorios, setRepositorios] = useState([]);
  const [Issues, setIssues] = useState([]);
  const [MostrarPopupAdicionarHoras, setMostrarPopupAdicionarHoras] = useState(
    false,
  );

  const [RepoPopup, setRepoPopup] = useState();
  const [IssueNumeroPopup, setIssueNumeroPopup] = useState();

  const [Comentario, setComentario] = useState();
  const [Status, setStatus] = useState();
  const [QTDHoras, setQTDHoras] = useState(0);
  const [TipoHora, setTipoHora] = useState('novas_demandas');
  const [FiltroIssues, setFiltroIssues] = useState('abertas');
  const [
    MostrarPopupAdicionarComentario,
    setMostrarPopupAdicionarComentario,
  ] = useState(false);

  const CamposHeader = [
    'Issue',
    'Titulo',
    'Status',
    'Data Abertura',
    'Autor',
    'Designado',
    'Prioridade',
    'Complexidade',
    'Horas Previstas',
    'Horas Utilizadas',
    'Entrega',
    'C',
  ];
  const CamposBody = [
    'number',
    'title',
    'state',
    'created_at',
    'user.login',
    'assignee_name',
    'prioridade',
    'complexidade',
    'horas_previstas',
    'horas_utilizadas',
    'data_entrega',
    'comments',
  ];

  useEffect(() => {
    carregarDados();
  }, [Page]);

  const carregarDados = async (FiltroIssuesParm = FiltroIssues) => {
    setLoading(true);

    //console.log('id : ' + id);

    let IssuesAux = await getIssues(id, FiltroIssuesParm);
    setTotal(IssuesAux.length);
    setIssues(IssuesAux);

    //console.log('IssuesAux : ' + JSON.stringify(IssuesAux));

    setLoading(false);
  };

  const editarIssue = (repo, issue) => {
    History.push(`/issues/${repo}/${issue}`);
  };

  const adicionarComentarioIssue = (repo, issue, issue_status) => {
    setRepoPopup(repo);
    setIssueNumeroPopup(issue);
    setStatus(issue_status);
    setMostrarPopupAdicionarComentario(true);
  };
  const adicionarHoraIssue = (repo, issue, issue_status) => {
    setRepoPopup(repo);
    setIssueNumeroPopup(issue);
    setStatus(issue_status);
    setMostrarPopupAdicionarHoras(true);
  };

  const funcaoVisualizarIssues = ({row}) => {
    //console.log('row : ' + JSON.stringify(row));

    return (
      <Tooltip title="Editar">
        <IconButton onClick={() => editarIssue(id, row.number)}>
          <Edit />
        </IconButton>
      </Tooltip>
    );
  };

  const funcaoAdicionarComentario = ({row}) => {
    //console.log('row : ' + JSON.stringify(row));

    return (
      <Tooltip title="Adicionar Comentário">
        <IconButton
          onClick={() => adicionarComentarioIssue(id, row.number, row.state)}>
          <Description />
        </IconButton>
      </Tooltip>
    );
  };

  const funcaoAdicionarHoraIssue = ({row}) => {
    //console.log('row : ' + JSON.stringify(row));

    return (
      <Tooltip title="Adicionar Hora">
        <IconButton
          onClick={() => adicionarHoraIssue(id, row.number, row.state)}>
          <AccessTime />
        </IconButton>
      </Tooltip>
    );
  };

  const handleEnviarComentarioIssue = async () => {
    let Resp = await enviarComentarioIssue(
      RepoPopup,
      IssueNumeroPopup,
      Comentario,
      Status,
    );

    //console.log('Resp : ' + JSON.stringify(Resp));

    if (Resp && (Resp.status == 200 || Resp.status == 201)) {
      alert('Enviado com sucesso!');
      setMostrarPopupAdicionarComentario(false);
      window.location.reload();
    } else {
      alert('ERRO ao enviar!');
    }
  };

  const handleEnviarHoraIssue = async () => {
    if (!QTDHoras || Number.isNaN(parseFloat(QTDHoras)) || QTDHoras <= 0) {
      alert('Forneça uma quantidade de horas válida!');
      return;
    }

    let QTDHorasAux = QTDHoras.replace(',', '.');
    QTDHorasAux = QTDHorasAux.replace(',', '.');

    //console.log('QTDHorasAux : ' + QTDHorasAux);

    let Resp = await enviarHorasIssue(
      RepoPopup,
      IssueNumeroPopup,
      QTDHorasAux,
      TipoHora,
      Status,
    );

    //console.log('Resp : ' + JSON.stringify(Resp));

    if (Resp) {
      alert('Enviado com sucesso!');
      setMostrarPopupAdicionarHoras(false);
      window.location.reload();
    } else {
      alert('ERRO ao enviar!');
    }
  };

  const handleClickFiltroIssues = (Valor) => {
    setFiltroIssues(Valor);
    //console.log('Valor : ' + Valor);

    carregarDados(Valor);
  };

  return (
    <>
      <Container loading={loading} {...props}>
        <Grid
          Rota={'issues'}
          Rows={Issues}
          Total={Total}
          CamposHeader={CamposHeader}
          CamposBody={CamposBody}
          setPage={setPage}
          setLinhasPorPagina={setLinhasPorPagina}
          FuncaoAdicionalArray={[
            funcaoAdicionarHoraIssue,
            funcaoVisualizarIssues,
            funcaoAdicionarComentario,
          ]}
          CancVisualizar={true}
          CancEditar={true}
          CancExcluir={true}
          FuncaoCadastrar={() => {
            History.push(`/issues/${id}/cad`);
          }}
          handleClickFiltroIssues={handleClickFiltroIssues}
          FiltroIssues={FiltroIssues}
        />
      </Container>
      {MostrarPopupAdicionarHoras && (
        <Modal
          funcaoFechar={setMostrarPopupAdicionarHoras}
          funcaoSubmit={handleEnviarHoraIssue}>
          <span>Adicionar horas Issue</span>
          <TextInputAdmin
            required
            label="Quantidade de Horas"
            autoComplete="none"
            value={QTDHoras}
            onChange={({target}) => setQTDHoras(target.value)}
          />
          <SelectInputAdmin
            label="Tipo Hora"
            value={TipoHora}
            onChange={({target}) => setTipoHora(target.value)}
            //disabled={true}
          >
            <MenuItem value={'novas_demandas'}>Novas Demandas</MenuItem>
            <MenuItem value={'melhorias'}>Melhorias</MenuItem>
            <MenuItem value={'correcao_bugs'}>Correcao de Bugs</MenuItem>
            <MenuItem value={'testes'}>Testes</MenuItem>
            <MenuItem value={'outra'}>Outra</MenuItem>
          </SelectInputAdmin>
          {Status && (
            <SelectInputAdmin
              label="Status"
              value={Status}
              onChange={({target}) => setStatus(target.value)}>
              <MenuItem value={'open'}>Aberto</MenuItem>
              <MenuItem value={'closed'}>Fechado</MenuItem>
            </SelectInputAdmin>
          )}
        </Modal>
      )}
      {MostrarPopupAdicionarComentario && (
        <Modal
          funcaoFechar={setMostrarPopupAdicionarComentario}
          funcaoSubmit={handleEnviarComentarioIssue}>
          <span>Adicionar comentário Issue</span>
          <TextInputAdmin
            required
            label="Comentário"
            autoComplete="nome"
            value={Comentario}
            onChange={({target}) => setComentario(target.value)}
            multiline
            size="large"
          />
          <SelectInputAdmin
            label="Status"
            value={Status}
            onChange={({target}) => setStatus(target.value)}>
            <MenuItem value={'open'}>Aberto</MenuItem>
            <MenuItem value={'closed'}>Fechado</MenuItem>
          </SelectInputAdmin>
        </Modal>
      )}
    </>
  );
};

const Modal = (props) => (
  <>
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'grey',
        zIndex: 1200,
        opacity: 0.5,
      }}></div>
    <div
      style={{
        position: 'absolute',
        top: 200,
        // marginTop: '15%',
        right: 750,
        width: 600,
        height: 600,
        backgroundColor: 'white',
        zIndex: 1250,
        borderRadius: 10,
        padding: 20,
      }}>
      <Button
        onClick={() => {
          props.funcaoFechar(false);
        }}
        style={{position: '', left: '93%', top: 0}}>
        <img
          src="../../../assets/icone_fechar.png"
          width={20}
          height={20}
          style={{right: 0, top: 0}}
        />
      </Button>
      <div>{props.children}</div>
      <p></p>
      <br></br>
      <br></br>
      <DivBotaoVoltar>
        <Button
          onClick={() => props.funcaoFechar(false)}
          fullWidth
          variant="contained"
          color="primary">
          Voltar
        </Button>
      </DivBotaoVoltar>
      <DivBotao>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={props.funcaoSubmit}>
          Enviar
        </Button>
      </DivBotao>
    </div>
  </>
);

export default BlogPosts;

import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Title from '~/componentes/title';

import {TextInputAdmin, SelectInputAdmin} from '~/componentes/TextInputAdmin';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {useHistory, useLocation, useParams} from 'react-router-dom';
import {getIssue, alterarIssue, cadastrarIssue} from '~/servicos/firebase_api';
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
import Button from '@material-ui/core/Button';
import {getMode} from '~/core';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import InboxIcon from '@mui/icons-material/Inbox';
//import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled';
import {formatarData} from '~/core';

const IssueEditar = (props) => {
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Modo, setModo] = useState('Editar');
  const [DisplayMode, setDisplayMode] = useState(false);

  const History = useHistory();
  const Location = useLocation();
  const {repo, issue} = useParams();

  const [Issue, setIssue] = useState();
  const [IssueFirebase, setIssueFirebase] = useState();

  const [IssueID, setIssueID] = useState();
  const [Numero, setNumero] = useState();
  const [Titulo, setTitulo] = useState();
  const [Autor, setAutor] = useState();
  const [Status, setStatus] = useState();

  const [Prioridade, setPrioridade] = useState();
  const [Complexidade, setComplexidade] = useState();

  const [HorasPrevistas, setHorasPrevistas] = useState();
  const [HorasUtilizadas, setHorasUtilizadas] = useState();
  const [DataEntrega, setDataEntrega] = useState();
  const [Descricao, setDescricao] = useState();

  useEffect(() => {
    let ModoAux = getMode(Location);
    //console.log('ModoAux : ' + ModoAux);

    if (ModoAux && ModoAux != 'erro') {
      setModo(ModoAux);
    }

    carregarDados(ModoAux);
  }, [Inicio]);

  const carregarDados = async (ModoParm) => {
    setLoading(true);

    if (ModoParm != 'Cadastrar') {
      let IsseAux = await getIssue(repo, issue);
      //console.log('IsseAux : ' + JSON.stringify(IsseAux));
      //console.log('IsseAux.events : ' + JSON.stringify(IsseAux.events));

      let IssueFirebaseAux = IsseAux.issue_firebase;
      //console.log('IssueFirebaseAux : ' + JSON.stringify(IssueFirebaseAux));

      formatar(IsseAux, IssueFirebaseAux);
    }

    setLoading(false);
  };

  const formatar = (IssueParm, IssueFirebase) => {
    setIssueID(IssueParm.id);
    setNumero(IssueParm.number);
    setTitulo(IssueParm.title);
    setAutor(IssueParm.user.login);
    setStatus(IssueParm.state);
    setDescricao(IssueParm.body);

    setPrioridade(IssueFirebase ? IssueFirebase.prioridade : null);
    setComplexidade(IssueFirebase ? IssueFirebase.complexidade : null);
    setHorasPrevistas(IssueFirebase ? IssueFirebase.horas_previstas : null);
    setHorasUtilizadas(IssueFirebase ? IssueFirebase.horas_utilizadas : null);
    setDataEntrega(IssueFirebase ? IssueFirebase.data_entrega : null);

    setIssue(IssueParm);
    setIssueFirebase(IssueFirebase);
  };

  const validouDados = () => {
    let Validou = true;

    if (!Titulo || Titulo.length < 10) {
      alert('Preencha corretamente o título');
      Validou = false;
    }
    return Validou;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validouDados()) return;

    switch (Modo) {
      case 'Cadastrar':
        cadastrar();
        break;
      case 'Visualizar':
        History.goBack();
        break;
      case 'Editar':
        editar();
        break;

      default:
        console.log('Nenhuma ação escolhida');
        break;
    }
  };

  const getDados = () => {
    let Dados = {
      titulo: Titulo,
      body: Descricao,
      repo,
      prioridade: Prioridade ? Prioridade : null,
      complexidade: Complexidade ? Complexidade : null,
      horas_previstas: HorasPrevistas ? HorasPrevistas : null,
      horas_utilizadas: HorasUtilizadas ? HorasUtilizadas : null,
      data_entrega: DataEntrega ? DataEntrega : null,
      descricao: Descricao ? Descricao : null,
    };

    if (Modo != 'Cadastrar') {
      Dados = {
        ...Dados,
        issue_id: IssueID,
        issue_numero: Issue.number,
        status: Status,
      };
    }

    return Dados;
  };

  const cadastrar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await cadastrarIssue(repo, Dados);
    finalizarAcao(Sucesso, 'CADASTRAR');
  };

  const editar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await alterarIssue(repo, Issue.number, Dados);
    //console.log('Sucesso : ' + Sucesso);
    finalizarAcao(Sucesso, 'ALTERAR');
  };

  const finalizarAcao = (MSG_RESULTADO, MSG_TIPO_ACAO) => {
    localStorage.setItem('@MSG_RESULTADO', MSG_RESULTADO.toString());
    localStorage.setItem('@MSG_TIPO_ACAO', MSG_TIPO_ACAO);

    setLoading(false);
    History.goBack();
  };

  const abrirIssue = () => {
    window.open(
      Numero
        ? `https://github.com/fwctecnologia/${repo}/issues/${Numero}`
        : `https://github.com/fwctecnologia/${repo}/issues`,
      '_blank',
    );
  };

  const abrirProjeto = () => {
    window.open(
      `https://github.com/fwctecnologia/${repo}/projects/1`,
      '_blank',
    );
  };

  return (
    <Container loading={loading} {...props}>
      <TableContainer component={Paper}>
        <Title>{Modo}</Title>
        <DivConteudoFormulario>
          {!Issue && Modo != 'Cadastrar' ? (
            <></>
          ) : (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <div>
                  <Button
                    onClick={abrirIssue}
                    variant="contained"
                    color="primary"
                    style={{marginRight: 15}}>
                    Abrir Issue
                  </Button>
                  <Button
                    onClick={abrirProjeto}
                    variant="contained"
                    color="primary">
                    Abrir Projeto
                  </Button>
                </div>
                <TextInputAdmin
                  required
                  label="Repositório"
                  autoComplete="nome"
                  value={repo}
                  disabled={true}
                />

                {Modo != 'Cadastrar' && (
                  <>
                    <TextInputAdmin
                      label="ID"
                      value={IssueID}
                      disabled={true}
                    />
                    <TextInputAdmin
                      label="Número"
                      autoComplete="nome"
                      value={Numero}
                      onChange={({target}) => setNumero(target.value)}
                      disabled={true}
                    />
                  </>
                )}

                <TextInputAdmin
                  required
                  label="Título"
                  autoComplete="nome"
                  value={Titulo}
                  onChange={({target}) => setTitulo(target.value)}
                />

                {Modo != 'Cadastrar' && (
                  <>
                    <TextInputAdmin
                      label="Autor"
                      autoComplete="nome"
                      value={Autor}
                      onChange={({target}) => setAutor(target.value)}
                      disabled={true}
                    />
                    <SelectInputAdmin
                      label="Status"
                      value={Status}
                      onChange={({target}) => setStatus(target.value)}>
                      <MenuItem value={'open'}>Aberto</MenuItem>
                      <MenuItem value={'closed'}>Fechado</MenuItem>
                    </SelectInputAdmin>
                  </>
                )}
                {Modo != 'Cadastrar' && (
                  <TextInputAdmin
                    label="Horas Utilizadas"
                    autoComplete="nome"
                    value={HorasUtilizadas}
                    onChange={({target}) => setHorasUtilizadas(target.value)}
                    disabled={true}
                  />
                )}

                <TextInputAdmin
                  label="Horas Previstas"
                  autoComplete="nome"
                  value={HorasPrevistas}
                  onChange={({target}) => setHorasPrevistas(target.value)}
                  //disabled={true}
                />

                <br></br>
                <Label>Descrição Issue</Label>

                <CKEditor
                  editor={ClassicEditor}
                  data={Descricao}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescricao(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />

                <TextInputAdmin
                  label="Data Entrega"
                  autoComplete="nome"
                  value={DataEntrega}
                  onChange={({target}) => setDataEntrega(target.value)}
                  //disabled={true}
                />

                <SelectInputAdmin
                  label="Prioridade"
                  value={Prioridade}
                  onChange={({target}) => setPrioridade(target.value)}
                  //disabled={true}
                >
                  <MenuItem value={'baixa'}>Baixa</MenuItem>
                  <MenuItem value={'média'}>Média</MenuItem>
                  <MenuItem value={'alta'}>Alta</MenuItem>
                  <MenuItem value={'muito_alta'}>Muito Alta</MenuItem>
                </SelectInputAdmin>

                <SelectInputAdmin
                  label="Complexidade"
                  value={Complexidade}
                  onChange={({target}) => setComplexidade(target.value)}
                  //disabled={true}
                >
                  <MenuItem value={'baixa'}>Baixa</MenuItem>
                  <MenuItem value={'média'}>Média</MenuItem>
                  <MenuItem value={'alta'}>Alta</MenuItem>
                  <MenuItem value={'muito_alta'}>Muito Alta</MenuItem>
                </SelectInputAdmin>

                {Issue && Issue.events && Issue.events.length > 0 && (
                  <>
                    <Label>Eventos</Label>
                    <List>
                      {Issue.events.map((EventoItem) => {
                        return (
                          <ListItem>
                            <span style={{fontWeight: 'bold'}}>
                              {EventoItem.event}
                            </span>
                            {` - ${EventoItem.actor.login} - ${
                              EventoItem.project_card
                                ? EventoItem.project_card.column_name + ' - '
                                : ''
                            }${formatarData(EventoItem.created_at)}`}
                          </ListItem>
                        );
                      })}
                    </List>
                  </>
                )}
                {Issue && Issue.comentarios && Issue.comentarios.length > 0 && (
                  <>
                    <Label>Comentários</Label>
                    <List>
                      {Issue.comentarios.map((ComentarioItem) => {
                        return (
                          <ListItem>
                            <span style={{fontWeight: 'bold'}}>
                              {ComentarioItem.body}
                            </span>
                            {` - ${ComentarioItem.user.login} - ${formatarData(
                              ComentarioItem.created_at,
                            )}`}
                          </ListItem>
                        );
                      })}
                    </List>
                  </>
                )}
                {Issue && IssueFirebase && IssueFirebase.log_horas && (
                  <>
                    <Label>Log de Horas</Label>
                    <List>
                      {IssueFirebase.log_horas.map((Log) => {
                        return (
                          <ListItem>
                            <span style={{fontWeight: 'bold'}}>
                              {`${Log.horas_adicionadas} hrs - `}
                            </span>
                            {`${formatarData(Log.data)} - ${Log.tipo_hora} - ${
                              Log.usuario
                            }`}
                          </ListItem>
                        );
                      })}
                    </List>
                  </>
                )}

                <p></p>
                <br></br>
                <br></br>
                <DivBotaoVoltar>
                  <Button
                    onClick={() => History.goBack()}
                    fullWidth
                    variant="contained"
                    color="primary">
                    Voltar
                  </Button>
                </DivBotaoVoltar>
                {Modo == 'Visualizar' ? (
                  <></>
                ) : (
                  <DivBotao>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary">
                      Salvar
                    </Button>
                  </DivBotao>
                )}
              </Formulario>
            </>
          )}
        </DivConteudoFormulario>
      </TableContainer>
    </Container>
  );
};

export default IssueEditar;

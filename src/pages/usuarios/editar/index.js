import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Title from '~/componentes/title';

import {TextInputAdmin, SelectInputAdmin} from '~/componentes/TextInputAdmin';
import Checkbox from '@material-ui/core/Checkbox';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {
  getAdminUsuario,
  alterarUsuarioAdmin,
  excluirUsuarioAdmin,
  cadastrarUsuarioAdmin,
  getAdminRotas,
} from '~/servicos/firebase_api';
import {
  DivCheckbox,
  DivCheckboxAdmin,
  Label,
  DivPermissoesAcesso,
  DivLabelPermissoesAcesso,
  DivRotasPermissoes,
} from '../styles';

import {
  DivConteudoFormulario,
  Formulario,
  DivBotao,
  DivBotaoVoltar,
  ClassesBase,
} from '~/styles_base';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';
import {getMode} from '~/core';

const UsuariosEditar = (props) => {
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Usuario, setUsuario] = useState();
  const [Nome, setNome] = useState();
  const [Email, setEmail] = useState();
  const [Telefone, setTelefone] = useState();
  const [Senha, setSenha] = useState();
  const [Disabled, setDisabled] = useState(false);
  const [Modo, setModo] = useState('Editar');
  const [DisplayMode, setDisplayMode] = useState(false);
  const [UsuarioAdmin, setUsuarioAdmin] = useState(false);
  const [RotasAdmin, setRotasAdmin] = useState();
  const [RotasAdminSelecionadas, setRotasAdminSelecionadas] = useState({});

  const History = useHistory();
  const Location = useLocation();
  const {id} = useParams();

  useEffect(() => {
    let ModoAux = getMode(Location);
    setModo(ModoAux);

    if (ModoAux != 'Editar' && ModoAux != 'Cadastrar') {
      setDisplayMode(true);
    }

    const subscript = async () => {
      if (ModoAux != 'Cadastrar') {
        await carregarDados();
      }

      await carregarRotas();
    };

    subscript();
  }, [Inicio]);

  const carregarRotas = async () => {
    setLoading(true);

    let RotasAdminAux = await getAdminRotas();
    setRotasAdmin(RotasAdminAux);

    //console.log('RotasAdminAux : ' + JSON.stringify(RotasAdminAux));
    setLoading(false);
  };
  const carregarDados = async () => {
    setLoading(true);

    let UsuarioAux = await getAdminUsuario(id);
    setUsuario(UsuarioAux);

    if (UsuarioAux.AdminPaths) {
      setUsuarioAdmin(true);
      setRotasAdminSelecionadas(UsuarioAux.AdminPaths);

      //console.log(        'UsuarioAux.paths : ' + JSON.stringify(UsuarioAux.AdminPaths),      );
    }

    formatar(UsuarioAux);
    setLoading(false);
  };

  const formatar = (UsuarioParm) => {
    setNome(UsuarioParm.displayName);
    setEmail(UsuarioParm.email);
    setTelefone(UsuarioParm.phoneNumber);
    setDisabled(UsuarioParm.disabled);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (Modo) {
      case 'Visualizar':
        History.goBack();
        break;
      case 'Cadastrar':
        cadastrar();
        break;
      case 'Editar':
        editar();
        break;
      case 'Excluir':
        excluir();
        break;

      default:
        console.log('Nenhuma ação escolhida');
        break;
    }
  };

  const getDados = () => {
    return {
      displayName: Nome,
      email: Email,
      phoneNumber: Telefone,
      disabled: Disabled,
    };
  };

  const cadastrar = async () => {
    setLoading(true);

    let Dados = getDados();

    let DadosAdmin = {
      UsuarioAdmin: UsuarioAdmin,
      Paths: RotasAdminSelecionadas,
    };

    if (Senha && Senha.length > 0) {
      Dados = {...Dados, password: Senha};
    }

    let Sucesso = await cadastrarUsuarioAdmin(Dados, DadosAdmin);

    if (Sucesso) {
      finalizarAcao(Sucesso, 'CADASTRAR');
    } else {
      alert('Erro ao cadastrr o usuário');
    }
  };

  const editar = async () => {
    setLoading(true);

    let Dados = getDados();

    let DadosAdmin = {
      UsuarioAdmin: UsuarioAdmin,
      Paths: RotasAdminSelecionadas,
    };

    let Sucesso = await alterarUsuarioAdmin(Usuario.id, Dados, DadosAdmin);
    finalizarAcao(Sucesso, 'ALTERAR');
  };

  const excluir = async () => {
    setLoading(true);

    let Sucesso = await excluirUsuarioAdmin(Usuario.id);
    finalizarAcao(Sucesso, 'EXCLUIR');
  };

  const finalizarAcao = async (MSG_RESULTADO, MSG_TIPO_ACAO) => {
    localStorage.setItem('@MSG_RESULTADO', MSG_RESULTADO.toString());
    localStorage.setItem('@MSG_TIPO_ACAO', MSG_TIPO_ACAO);

    setLoading(false);
    History.goBack();
  };

  const handleChangeCheckBoxPermissoes = (t) => {
    const auxValues = {...RotasAdminSelecionadas};
    auxValues[t.name] = t.checked;
    setRotasAdminSelecionadas(auxValues);
  };

  return (
    <Container loading={loading} {...props}>
      <TableContainer component={Paper}>
        <Title>{Modo}</Title>
        <DivConteudoFormulario>
          {(!Usuario && Modo != 'Cadastrar') || !RotasAdmin ? (
            <></>
          ) : (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <TextInputAdmin
                  label="ID"
                  value={Usuario ? Usuario.id : ''}
                  disabled={true}
                />

                <TextInputAdmin
                  required
                  label="Nome"
                  autoComplete="nome"
                  autoFocus
                  value={Nome}
                  onChange={({target}) => setNome(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Email"
                  autoComplete="email"
                  value={Email}
                  onChange={({target}) => setEmail(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Telefone"
                  value={Telefone}
                  onChange={({target}) => setTelefone(target.value)}
                  disabled={DisplayMode}
                />
                <TextInputAdmin
                  required={Modo == 'Cadastrar'}
                  label="Senha( Maior que 6 dígitos)"
                  value={Senha}
                  onChange={({target}) => setSenha(target.value)}
                  disabled={DisplayMode}
                />

                <DivCheckboxAdmin>
                  <Label>Administrador</Label>
                  <Checkbox
                    color={'primary'}
                    disableRipple={true}
                    checked={UsuarioAdmin}
                    size="small"
                    onChange={(e) => setUsuarioAdmin(!UsuarioAdmin)}
                    disabled={DisplayMode}
                  />
                </DivCheckboxAdmin>

                {UsuarioAdmin ? (
                  <DivPermissoesAcesso>
                    <DivLabelPermissoesAcesso>
                      <Label>Permissões de acesso ao painel Admin</Label>

                      <DivRotasPermissoes>
                        {RotasAdmin.map((row) => {
                          let CheckboxMarcado = null;
                          CheckboxMarcado = RotasAdminSelecionadas[row.path];

                          return (
                            <DivCheckbox>
                              <Label>{row.nome}</Label>
                              <Checkbox
                                name={row.path}
                                //disableRipple={true}
                                color={'primary'}
                                defaultChecked={CheckboxMarcado}
                                size="small"
                                onChange={({target}) =>
                                  handleChangeCheckBoxPermissoes(target)
                                }
                                disabled={DisplayMode}
                              />
                            </DivCheckbox>
                          );
                        })}
                      </DivRotasPermissoes>
                    </DivLabelPermissoesAcesso>
                  </DivPermissoesAcesso>
                ) : (
                  <></>
                )}

                <DivCheckbox>
                  <Label>Desativar usuário</Label>
                  <Checkbox
                    color={'primary'}
                    checked={Disabled}
                    size="small"
                    onChange={(e) => setDisabled(!Disabled)}
                    disabled={DisplayMode}
                  />
                </DivCheckbox>

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

export default UsuariosEditar;

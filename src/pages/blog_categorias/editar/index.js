import React, {useState, useEffect} from 'react';
import Container from '~/componentes/container';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Title from '~/componentes/title';

import {TextInputAdmin, SelectInputAdmin} from '~/componentes/TextInputAdmin';
import MenuItem from '@material-ui/core/MenuItem';

import {useHistory, useLocation, useParams} from 'react-router-dom';
import {
  getBlogCategoria,
  cadastrarBlogCategoria,
  alterarBlogCategoria,
  deletarBlogCategoria,
  getTextoTraduzido,
} from '~/servicos/firebase_api';
import {
  DivConteudoFormulario,
  Formulario,
  DivBotao,
  DivBotaoVoltar,
  ClassesBase,
} from '~/styles_base';
import Button from '@material-ui/core/Button';
import {getMode} from '~/core';

const BlogCategoriasEditar = (props) => {
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Modo, setModo] = useState('Editar');
  const [DisplayMode, setDisplayMode] = useState(false);

  const History = useHistory();
  const Location = useLocation();
  const {id} = useParams();

  const [BlogCategoria, setBlogCategoria] = useState();

  const [Nome, setNome] = useState();
  const [NomeEN, setNomeEN] = useState();
  const [NomeES, setNomeES] = useState();

  const [IDChave, setIDChave] = useState();

  const [Status, setStatus] = useState('A');

  useEffect(() => {
    let ModoAux = getMode(Location);
    setModo(ModoAux);

    if (ModoAux != 'Editar' && ModoAux != 'Cadastrar') {
      setDisplayMode(true);
    }

    if (ModoAux != 'Cadastrar') {
      carregarDados();
    }
  }, [Inicio]);

  const carregarDados = async () => {
    setLoading(true);

    let BlogCategoriaAux = await getBlogCategoria(id);
    setBlogCategoria(BlogCategoriaAux);

    formatar(BlogCategoriaAux);
    setLoading(false);
  };

  const formatar = (BlogCategoriaParm) => {
    const {nome, nome_en, nome_es, id_chave, status} = BlogCategoriaParm;
    setNome(nome);
    setNomeEN(nome_en);
    setNomeES(nome_es);
    setStatus(status);
    setIDChave(id_chave);
  };

  const validouDados = () => {
    let Validou = true;

    if (!Nome) {
      alert('É necessário inserir um Nome');
      Validou = false;
    }

    if (!IDChave) {
      alert('É necessário inserir um ID Chave');
      Validou = false;
    }

    return Validou;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validouDados()) return;

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
      nome: Nome,
      nome_en: NomeEN,
      nome_es: NomeES,
      id_chave: IDChave,
      status: Status,
    };
  };

  const cadastrar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await cadastrarBlogCategoria(Dados);
    finalizarAcao(Sucesso, 'CADASTRAR');
  };

  const editar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await alterarBlogCategoria(BlogCategoria.id, Dados);
    finalizarAcao(Sucesso, 'ALTERAR');
  };

  const excluir = async () => {
    setLoading(true);

    let Sucesso = await deletarBlogCategoria(BlogCategoria.id);
    finalizarAcao(Sucesso, 'EXCLUIR');
  };

  const finalizarAcao = (MSG_RESULTADO, MSG_TIPO_ACAO) => {
    localStorage.setItem('@MSG_RESULTADO', MSG_RESULTADO.toString());
    localStorage.setItem('@MSG_TIPO_ACAO', MSG_TIPO_ACAO);

    setLoading(false);
    History.goBack();
  };

  const traduzirCategoria = async (e) => {
    e.preventDefault();
    let TextoAux = '';

    setLoading(true);

    if (Nome) {
      //console.log('Descricao : ' + Descricao);

      TextoAux = await getTextoTraduzido(Nome, 'en');
      TextoAux = TextoAux.toString();

      setNomeEN(TextoAux);

      TextoAux = await getTextoTraduzido(Nome, 'es');
      TextoAux = TextoAux.toString();

      setNomeES(TextoAux);
    }

    setLoading(false);
  };

  return (
    <Container loading={loading} {...props}>
      <TableContainer component={Paper}>
        <Title>{Modo}</Title>
        <DivConteudoFormulario>
          {!BlogCategoria && Modo != 'Cadastrar' ? (
            <></>
          ) : (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <TextInputAdmin
                  label="ID"
                  value={BlogCategoria ? BlogCategoria.id : ''}
                  disabled={true}
                />
                <br></br>

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
                  label="Nome - EN"
                  autoComplete="nome"
                  autoFocus
                  value={NomeEN}
                  onChange={({target}) => setNomeEN(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="Nome - ES"
                  autoComplete="nome"
                  autoFocus
                  value={NomeES}
                  onChange={({target}) => setNomeES(target.value)}
                  disabled={DisplayMode}
                />

                <TextInputAdmin
                  required
                  label="ID Chave"
                  autoFocus
                  value={IDChave}
                  onChange={({target}) => setIDChave(target.value)}
                  disabled={DisplayMode}
                />

                <br></br>

                <Button
                  onClick={traduzirCategoria}
                  type="submit"
                  variant="contained"
                  color="primary">
                  Traduzir Categoria
                </Button>
                <br></br>
                <br></br>

                <SelectInputAdmin
                  required
                  label="Status"
                  value={Status}
                  onChange={({target}) => setStatus(target.value)}
                  disabled={DisplayMode}>
                  <MenuItem value={'A'}>Ativo</MenuItem>
                  <MenuItem value={'I'}>Inativo</MenuItem>
                </SelectInputAdmin>

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

export default BlogCategoriasEditar;

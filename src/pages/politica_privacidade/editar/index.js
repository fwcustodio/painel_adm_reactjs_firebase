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
  getPoliticaPrivacidade,
  cadastrarPoliticaPrivacidade,
  alterarPoliticaPrivacidade,
  deletarPoliticaPrivacidade,
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
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PoliticaPrivacidadeEditar = (props) => {
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Modo, setModo] = useState('Editar');
  const [DisplayMode, setDisplayMode] = useState(false);

  const History = useHistory();
  const Location = useLocation();
  const {id} = useParams();

  const [PoliticaPrivacidade, setPoliticaPrivacidade] = useState();

  const [PoliticaDescricao, setPoliticaDescricao] = useState();
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

    let PoliticaPrivacidadeAux = await getPoliticaPrivacidade(id);
    setPoliticaPrivacidade(PoliticaPrivacidadeAux);

    formatar(PoliticaPrivacidadeAux);
    setLoading(false);
  };

  const formatar = (PoliticaPrivacidadeParm) => {
    setPoliticaDescricao(PoliticaPrivacidadeParm.descricao);
    setStatus(PoliticaPrivacidadeParm.status);
  };

  const validouDados = () => {
    let Validou = true;

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
      descricao: PoliticaDescricao,
      status: Status,
    };
  };

  const cadastrar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await cadastrarPoliticaPrivacidade(Dados);
    finalizarAcao(Sucesso, 'CADASTRAR');
  };

  const editar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await alterarPoliticaPrivacidade(
      PoliticaPrivacidade.id,
      Dados,
    );
    finalizarAcao(Sucesso, 'ALTERAR');
  };

  const excluir = async () => {
    setLoading(true);

    let Sucesso = await deletarPoliticaPrivacidade(PoliticaPrivacidade.id);
    finalizarAcao(Sucesso, 'EXCLUIR');
  };

  const finalizarAcao = (MSG_RESULTADO, MSG_TIPO_ACAO) => {
    localStorage.setItem('@MSG_RESULTADO', MSG_RESULTADO.toString());
    localStorage.setItem('@MSG_TIPO_ACAO', MSG_TIPO_ACAO);

    setLoading(false);
    History.goBack();
  };

  return (
    <Container loading={loading} {...props}>
      <TableContainer component={Paper}>
        <Title>{Modo}</Title>
        <DivConteudoFormulario>
          {(!PoliticaPrivacidade && Modo != 'Cadastrar') || loading ? (
            <></>
          ) : (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <TextInputAdmin
                  label="ID"
                  value={PoliticaPrivacidade ? PoliticaPrivacidade.id : ''}
                  disabled={true}
                />

                <CKEditor
                  editor={ClassicEditor}
                  data={PoliticaDescricao}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setPoliticaDescricao(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />

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

export default PoliticaPrivacidadeEditar;

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
  getIntensidade,
  cadastrarIntensidade,
  alterarIntensidade,
  deletarIntensidade,
  getAcabamentos,
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

const IntensidadesEditar = (props) => {
  const classes = ClassesBase();
  const [loading, setLoading] = useState(false);
  const [Inicio, setInicio] = useState(true);
  const [Modo, setModo] = useState('Editar');
  const [DisplayMode, setDisplayMode] = useState(false);

  const History = useHistory();
  const Location = useLocation();
  const {id} = useParams();

  const [Intensidade, setIntensidade] = useState();

  const [Acabamentos, setAcabamentos] = useState();
  const [AcabamentoSelecionado, setAcabamentoSelecionado] = useState();

  const [Nome, setNome] = useState();
  const [Status, setStatus] = useState('A');

  useEffect(() => {
    let ModoAux = getMode(Location);
    setModo(ModoAux);

    if (ModoAux != 'Editar' && ModoAux != 'Cadastrar') {
      setDisplayMode(true);
    }

    carregarDados(ModoAux);
  }, [Inicio]);

  const carregarDados = async (ModoParm) => {
    setLoading(true);

    let AcabamentosAux = await getAcabamentos();
    setAcabamentos(AcabamentosAux);

    if (ModoParm != 'Cadastrar') {
      let IntensidadeAux = await getIntensidade(id);
      setIntensidade(IntensidadeAux);

      formatar(IntensidadeAux);
    }

    setLoading(false);
  };

  const formatar = (IntensidadeAux) => {
    setNome(IntensidadeAux.nome);
    setAcabamentoSelecionado(IntensidadeAux.acabamento_id);
    setStatus(IntensidadeAux.status);
  };

  const validouDados = () => {
    let Validou = true;

    if (!Nome) {
      alert('É necessário inserir um nome');
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
    let AcabamentoSelecionadaAux = Acabamentos.find((Item) => {
      if (Item.id == AcabamentoSelecionado) return Item;
    });

    return {
      nome: Nome,
      //acabamento_id: AcabamentoSelecionado,
      //acabamento_nome: AcabamentoSelecionadaAux.nome,
      status: Status,
    };
  };

  const cadastrar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await cadastrarIntensidade(Dados);
    finalizarAcao(Sucesso, 'CADASTRAR');
  };

  const editar = async () => {
    setLoading(true);

    let Dados = getDados();

    let Sucesso = await alterarIntensidade(Intensidade.id, Dados);
    finalizarAcao(Sucesso, 'ALTERAR');
  };

  const excluir = async () => {
    setLoading(true);

    let Sucesso = await deletarIntensidade(Intensidade.id);
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
          {!Intensidade && Modo != 'Cadastrar' ? (
            <></>
          ) : (
            <>
              <Formulario
                className={classes.Formulario}
                onSubmit={handleSubmit}>
                <TextInputAdmin
                  label="ID"
                  value={Intensidade ? Intensidade.id : ''}
                  disabled={true}
                />
                {!loading && (
                  <TextInputAdmin
                    required
                    label="Nome"
                    autoComplete="nome"
                    autoFocus
                    value={Nome}
                    onChange={({target}) => setNome(target.value)}
                    disabled={DisplayMode}
                  />
                )}

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

export default IntensidadesEditar;

/*



                {!loading && (
                  <SelectInputAdmin
                    required
                    label="Acabamento"
                    value={AcabamentoSelecionado}
                    onChange={({target}) =>
                      setAcabamentoSelecionado(target.value)
                    }
                    disabled={DisplayMode}>
                    {Acabamentos &&
                      Acabamentos.map((AcabamentoItem) => (
                        <MenuItem value={AcabamentoItem.id}>
                          {AcabamentoItem.nome}
                        </MenuItem>
                      ))}
                  </SelectInputAdmin>
                )}
                
 */
